// scripts/github-calendar.js

document.addEventListener('DOMContentLoaded', () => {
    const calendarContainer = document.querySelector('.calendar');
    if (!calendarContainer) return;

    // Create Tooltip Element
    const tooltip = document.createElement('div');
    tooltip.className = 'contribution-tooltip';
    tooltip.style.cssText = `
        position: absolute; /* Using absolute inside body instead of fixed */
        background: var(--surface, #1e1e1e);
        color: var(--text-primary, #fff);
        padding: 0.5rem 0.75rem;
        border-radius: 6px;
        font-size: 0.8rem;
        pointer-events: none;
        opacity: 0;
        transform: scale(0.9);
        transition: opacity 0.2s, transform 0.2s;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.5);
        border: 1px solid var(--border-color, #333);
        text-align: center;
        white-space: nowrap;
    `;
    document.body.appendChild(tooltip);

    // Styling
    const style = document.createElement('style');
    style.innerHTML = `
        .contribution-graph {
            width: 100%;
            overflow-x: auto;
            scrollbar-width: thin;
            padding-bottom: 10px;
        }
        .contribution-graph table {
            border-spacing: 3px;
            border-collapse: separate;
            font-size: 10px;
            color: var(--text-secondary);
            margin: 0; /* Align left */
        }
        .contribution-graph td {
            position: relative;
            padding: 0;
        }
        .day-label {
            font-size: 10px;
            fill: var(--text-secondary);
            text-anchor: start;
        }
        .month-label {
            font-size: 10px;
            fill: var(--text-secondary);
        }
        .contribution-day {
            width: 11px;
            height: 11px;
            border-radius: 2px;
            cursor: pointer;
            transition: transform 0.1s, box-shadow 0.1s;
        }
        .contribution-day:hover {
            transform: scale(1.2);
            box-shadow: 0 0 0 2px var(--bg-primary);
        }
        /* Level Colors */
        .color-level-0 { background-color: var(--surface, #2d333b); }
        .color-level-1 { background-color: rgba(0, 242, 254, 0.25); }
        .color-level-2 { background-color: rgba(0, 242, 254, 0.5); }
        .color-level-3 { background-color: rgba(0, 242, 254, 0.75); }
        .color-level-4 { background-color: var(--accent-primary, #00f2fe); box-shadow: 0 0 5px var(--accent-primary); }
    `;
    document.head.appendChild(style);

    const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    function getLevelAndColorClass(count) {
        if (count === 0) return { level: 0, css: 'color-level-0' };
        if (count <= 2) return { level: 1, css: 'color-level-1' };
        if (count <= 5) return { level: 2, css: 'color-level-2' };
        if (count <= 8) return { level: 3, css: 'color-level-3' };
        return { level: 4, css: 'color-level-4' };
    }

    async function fetchContributions(year) {
        const USERNAME = 'vyomshah14';
        const targetYear = year === 'lastYear' ? new Date().getFullYear() : parseInt(year);
        const githubUrl = `https://github.com/users/${USERNAME}/contributions?to=${targetYear}-12-31`;

        const fetchWithTimeout = async (url, options = {}, timeout = 6000) => {
            const controller = new AbortController();
            const id = setTimeout(() => controller.abort(), timeout);
            try {
                const response = await fetch(url, { ...options, signal: controller.signal });
                clearTimeout(id);
                return response;
            } catch (e) {
                clearTimeout(id);
                throw e;
            }
        };

        try {
            let html = null;

            // Try 1: Vercel Proxy
            try {
                const proxyUrl = `/api/github-calendar-proxy?username=${USERNAME}&year=${targetYear}`;
                console.log(`[GitHub Calendar] Trying proxy: ${proxyUrl}`);
                const res = await fetchWithTimeout(proxyUrl);
                if (res.ok) {
                    html = await res.text();
                    console.log(`[GitHub Calendar] Proxy success! HTML length: ${html.length}`);
                } else {
                    console.warn(`[GitHub Calendar] Proxy returned status ${res.status}`);
                }
            } catch (e) {
                console.warn("[GitHub Calendar] Local proxy failed or timed out, trying fallback.", e.message);
            }

            // Try 2: Public CORS Proxy fallbacks
            if (!html) {
                const proxies = [
                    { url: `https://corsproxy.io/?${encodeURIComponent(githubUrl)}`, type: 'text' },
                    { url: `https://api.allorigins.win/get?url=${encodeURIComponent(githubUrl)}`, type: 'json' },
                    { url: `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(githubUrl)}`, type: 'text' }
                ];

                for (const proxy of proxies) {
                    try {
                        console.log(`[GitHub Calendar] Trying fallback: ${proxy.url}`);
                        const res = await fetchWithTimeout(proxy.url, {}, 8000);
                        if (res.ok) {
                            if (proxy.type === 'json') {
                                const data = await res.json();
                                html = data.contents;
                            } else {
                                html = await res.text();
                            }

                            if (html && html.length > 1000) { // Valid GitHub HTML is usually large
                                console.log(`[GitHub Calendar] Fallback success!`);
                                break;
                            }
                        }
                    } catch (e) {
                        console.warn(`[GitHub Calendar] Proxy failed (${proxy.url.split('/')[2]}):`, e.message);
                    }
                }
            }

            if (!html || html.length < 500) {
                throw new Error("Could not fetch valid HTML from GitHub.");
            }

            // Parse HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const cells = doc.querySelectorAll('.ContributionCalendar-day');

            if (cells.length === 0) {
                console.warn("[GitHub Calendar] No cells found with .ContributionCalendar-day class.");
            }

            const flatDays = Array.from(cells).map(cell => {
                const date = cell.getAttribute('data-date');
                if (!date) return null;

                const level = parseInt(cell.getAttribute('data-level'), 10) || 0;
                let count = 0;

                // 1. Try aria-label (Best way)
                // Example: "5 contributions on March 2, 2024"
                const ariaLabel = cell.getAttribute('aria-label');
                if (ariaLabel) {
                    const countMatch = ariaLabel.match(/^(\d+)/);
                    if (countMatch) {
                        count = parseInt(countMatch[1], 10);
                    }
                }

                // 2. Fallback to Tooltip if aria-label failed
                if (count === 0) {
                    const id = cell.getAttribute('id');
                    if (id) {
                        const tooltip = doc.querySelector(`tool-tip[for="${id}"]`);
                        if (tooltip) {
                            const text = tooltip.textContent.trim();
                            if (!text.startsWith("No")) {
                                count = parseInt(text.split(' ')[0], 10) || 0;
                            }
                        }
                    }
                }

                return { date, contributionCount: count, level };
            }).filter(d => d).sort((a, b) => new Date(a.date) - new Date(b.date));

            // Group by weeks
            const weeks = [];
            let currentWeek = { contributionDays: [] };

            flatDays.forEach(day => {
                currentWeek.contributionDays.push(day);
                const dateObj = new Date(day.date);
                if (dateObj.getUTCDay() === 6) {
                    weeks.push(currentWeek);
                    currentWeek = { contributionDays: [] };
                }
            });
            if (currentWeek.contributionDays.length > 0) {
                weeks.push(currentWeek);
            }

            return { rawData: { weeks }, targetYear };
        } catch (error) {
            console.error('[GitHub Calendar] Error in fetchContributions:', error);
            return null;
        }
    }

    function calculateMonthHeaders(weeks) {
        const headers = [];
        let lastMonth = -1;

        weeks.forEach((week, index) => {
            if (week.contributionDays.length > 0) {
                // Look at the first day of the week to decide the month
                const dayDate = new Date(week.contributionDays[0].date);
                const month = dayDate.getUTCMonth();

                if (month !== lastMonth) {
                    headers.push({ month: MONTHS[month], startIndex: index });
                    lastMonth = month;
                }
            }
        });

        // Convert to colSpan format
        const colSpanHeaders = [];
        for (let i = 0; i < headers.length; i++) {
            const current = headers[i];
            const next = headers[i + 1];
            const colSpan = next ? (next.startIndex - current.startIndex) : (weeks.length - current.startIndex);

            // Only push if colSpan > 0
            if (colSpan > 0) {
                colSpanHeaders.push({ month: current.month, colspan: colSpan });
            }
        }

        return colSpanHeaders;
    }

    function renderGraph(data, targetYearStr) {
        calendarContainer.innerHTML = '';

        const graphDiv = document.createElement('div');
        graphDiv.className = 'contribution-graph';

        const table = document.createElement('table');

        // Headers
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        // Empty top-left cell for day labels
        const tlCell = document.createElement('td');
        tlCell.style.width = '28px'; // Fixed width for day labels
        headerRow.appendChild(tlCell);

        const monthHeaders = calculateMonthHeaders(data.weeks);
        monthHeaders.forEach(header => {
            const td = document.createElement('td');
            td.colSpan = header.colspan;
            td.textContent = header.month;
            td.style.textAlign = 'left';
            td.style.paddingBottom = '4px';
            td.style.fontSize = '10px';
            headerRow.appendChild(td);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');

        // Render rows: 0 to 6 (Sun to Sat)
        for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
            const tr = document.createElement('tr');

            // Day label
            const labelTd = document.createElement('td');
            if (dayIndex === 1 || dayIndex === 3 || dayIndex === 5) {
                labelTd.textContent = DAYS[dayIndex];
            }
            labelTd.style.fontSize = '10px';
            labelTd.style.color = 'var(--text-secondary)';
            labelTd.style.paddingRight = '8px';
            labelTd.style.textAlign = 'left';
            labelTd.style.verticalAlign = 'middle';
            tr.appendChild(labelTd);

            // Columns (weeks)
            data.weeks.forEach((week) => {
                const td = document.createElement('td');
                const dayData = week.contributionDays.find(d => {
                    const dateObj = new Date(d.date);
                    return dateObj.getUTCDay() === dayIndex;
                });

                if (dayData) {
                    const dayDiv = document.createElement('div');

                    const cellDate = new Date(dayData.date);
                    const cellYear = cellDate.getUTCFullYear().toString();

                    let count = dayData.contributionCount;

                    // STRICT YEAR MATCHING: If not target year, hide color (level-0)
                    if (targetYearStr !== 'lastYear' && cellYear !== targetYearStr) {
                        dayDiv.className = `contribution-day color-level-0`;
                    } else {
                        const styleClass = getLevelAndColorClass(count).css;
                        dayDiv.className = `contribution-day ${styleClass}`;
                    }

                    // Tooltip
                    dayDiv.addEventListener('mouseenter', (e) => {
                        const rect = dayDiv.getBoundingClientRect();
                        tooltip.style.opacity = '1';
                        tooltip.style.transform = 'scale(1)';

                        let textCount = count === 0 ? 'No contributions' : count === 1 ? '1 contribution' : count + ' contributions';
                        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
                        const niceDate = new Date(dayData.date).toLocaleDateString('en-US', options);

                        tooltip.innerHTML = `<strong>${textCount}</strong><br/><span style="opacity:0.7;font-size:0.9em;">${niceDate}</span>`;

                        const tooltipRect = tooltip.getBoundingClientRect();
                        tooltip.style.left = (rect.left + window.scrollX - (tooltipRect.width / 2) + (rect.width / 2)) + 'px';
                        tooltip.style.top = (rect.top + window.scrollY - tooltipRect.height - 8) + 'px';
                    });

                    dayDiv.addEventListener('mouseleave', () => {
                        tooltip.style.opacity = '0';
                        tooltip.style.transform = 'scale(0.9)';
                    });

                    td.appendChild(dayDiv);
                }
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        }
        table.appendChild(tbody);
        graphDiv.appendChild(table);

        // Legend
        const legend = document.createElement('div');
        legend.style.cssText = 'display:flex; justify-content:flex-end; align-items:center; gap:5px; margin-top:8px; font-size:10px; color:var(--text-secondary); width:100%;';
        legend.innerHTML = `
            <span>Less</span>
            <div class="contribution-day color-level-0" style="margin: 0 1px;"></div>
            <div class="contribution-day color-level-1" style="margin: 0 1px;"></div>
            <div class="contribution-day color-level-2" style="margin: 0 1px;"></div>
            <div class="contribution-day color-level-3" style="margin: 0 1px;"></div>
            <div class="contribution-day color-level-4" style="margin: 0 1px;"></div>
            <span>More</span>
        `;
        graphDiv.appendChild(legend);

        calendarContainer.appendChild(graphDiv);
    }

    async function loadCalendar(yearInput) {
        calendarContainer.innerHTML = '<div style="text-align: center; color: var(--text-secondary); padding: 2rem;">Loading GitHub contributions...</div>';

        const dataInfo = await fetchContributions(yearInput);
        if (dataInfo && dataInfo.rawData) {
            renderGraph(dataInfo.rawData, yearInput === 'lastYear' ? new Date().getFullYear().toString() : yearInput.toString());
        } else {
            calendarContainer.innerHTML = '<div style="text-align: center; color: var(--text-secondary); padding: 2rem;">Failed to load contributions.</div>';
        }
    }

    const yearBtns = document.querySelectorAll('.year-btn');
    if (yearBtns.length > 0) {
        // Initial load
        loadCalendar('lastYear');

        // Handle year change via buttons
        yearBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                yearBtns.forEach(b => {
                    b.classList.remove('active');
                    b.style.background = 'transparent';
                    b.style.color = 'var(--text-secondary)';
                });

                const clickedBtn = e.target;
                clickedBtn.classList.add('active');
                clickedBtn.style.background = 'var(--accent-primary)';
                clickedBtn.style.color = 'white';

                loadCalendar(clickedBtn.getAttribute('data-year'));
            });
        });
    }
});
