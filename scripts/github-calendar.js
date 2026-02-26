document.addEventListener('DOMContentLoaded', () => {
    const yearSelector = document.getElementById('github-year-selector');
    const totalsText = document.getElementById('github-totals');
    const gridContainer = document.getElementById('github-calendar-grid');
    const USERNAME = 'vyomshah14';

    async function loadGitHubData(year) {
        totalsText.textContent = 'Loading...';
        gridContainer.innerHTML = '';
        gridContainer.style.opacity = '0.5';

        try {
            // Using our Vercel serverless function
            // In local development, the route is /api/..., in prod the same
            const response = await fetch(`/api/github-contributions?username=${USERNAME}&year=${year}`);

            if (!response.ok) {
                const err = await response.json();
                console.error("API error:", err);
                throw new Error("Failed to fetch contribution data");
            }

            const data = await response.json();

            totalsText.innerHTML = `${data.total} <span style="color: var(--text-muted); font-weight: 400;">contributions in ${year}</span>`;

            renderGrid(data.weeks);
        } catch (error) {
            console.error('Error fetching GitHub data:', error);
            totalsText.textContent = 'Error loading contributions.';
        } finally {
            gridContainer.style.opacity = '1';
        }
    }

    function getLevelAndColorClass(count) {
        if (count === 0) return { level: 0, css: 'level-0' };
        if (count <= 2) return { level: 1, css: 'level-1' };
        if (count <= 5) return { level: 2, css: 'level-2' };
        if (count <= 8) return { level: 3, css: 'level-3' };
        return { level: 4, css: 'level-4' };
    }

    function renderGrid(weeks) {
        gridContainer.innerHTML = '';

        // Add day labels (Mon, Wed, Fri)
        const labelsCol = document.createElement('div');
        labelsCol.className = 'calendar-day-labels';

        ['Mon', 'Wed', 'Fri'].forEach(day => {
            const label = document.createElement('div');
            label.className = 'day-label';
            label.textContent = day;
            labelsCol.appendChild(label);
        });
        gridContainer.appendChild(labelsCol);

        // Render each week column
        weeks.forEach(week => {
            const weekDiv = document.createElement('div');
            weekDiv.className = 'calendar-week';

            // A week has up to 7 days
            week.contributionDays.forEach(day => {
                const dayDiv = document.createElement('div');
                dayDiv.className = `calendar-day ${getLevelAndColorClass(day.contributionCount).css}`;

                // Native simple tooltip using title attribute for now, or building custom
                dayDiv.title = `${day.contributionCount} contributions on ${day.date}`;

                weekDiv.appendChild(dayDiv);
            });

            gridContainer.appendChild(weekDiv);
        });
    }

    // Event Listener for dropdown
    yearSelector.addEventListener('change', (e) => {
        loadGitHubData(e.target.value);
    });

    // Initial Load - default to current year
    const currentYear = new Date().getFullYear();
    yearSelector.value = currentYear.toString();

    // Fallback if option didn't exist
    if (!yearSelector.value) {
        const option = document.createElement('option');
        option.value = currentYear.toString();
        option.textContent = currentYear.toString();
        option.selected = true;
        yearSelector.appendChild(option);
    }

    loadGitHubData(yearSelector.value);
});
