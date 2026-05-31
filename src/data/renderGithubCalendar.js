const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const USERNAME = 'vyomshah14';

function contributionLevel(count) {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 8) return 3;
  return 4;
}

function targetYearFor(year) {
  return year === 'lastYear' ? new Date().getFullYear() : Number(year);
}

function normalizeWeeks(weeks) {
  return weeks.map((week) => ({
    contributionDays: week.contributionDays.map((day) => ({
      date: day.date,
      contributionCount: Number(day.contributionCount) || 0,
      level: Number.isFinite(Number(day.level)) ? Number(day.level) : contributionLevel(Number(day.contributionCount) || 0),
    })),
  }));
}

async function fetchJsonContributions(year) {
  const targetYear = targetYearFor(year);
  const response = await fetch(`/api/github-contributions?username=${USERNAME}&year=${targetYear}`);
  if (!response.ok) throw new Error(`GitHub JSON API returned ${response.status}`);
  const data = await response.json();
  if (!data?.weeks?.length) throw new Error('GitHub JSON API returned no weeks');
  return {
    total: Number(data.total) || 0,
    weeks: normalizeWeeks(data.weeks),
  };
}

async function fetchWithTimeout(url, options = {}, timeout = 8000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

function parseGitHubHtml(html) {
  const documentFragment = new DOMParser().parseFromString(html, 'text/html');
  const cells = [...documentFragment.querySelectorAll('.ContributionCalendar-day')];
  const days = cells.map((cell) => {
    const date = cell.getAttribute('data-date');
    if (!date) return null;

    const label = cell.getAttribute('aria-label') || '';
    const tooltipId = cell.getAttribute('id');
    const tooltip = tooltipId ? documentFragment.querySelector(`tool-tip[for="${tooltipId}"]`) : null;
    const tooltipText = tooltip?.textContent?.trim() || '';
    const countText = label || tooltipText;
    const count = countText.startsWith('No') ? 0 : Number.parseInt(countText, 10) || 0;

    return {
      date,
      contributionCount: count,
      level: Number(cell.getAttribute('data-level')) || contributionLevel(count),
    };
  }).filter(Boolean).sort((a, b) => new Date(a.date) - new Date(b.date));

  if (!days.length) throw new Error('No contribution cells found in GitHub HTML');

  const weeks = [];
  let currentWeek = { contributionDays: [] };

  days.forEach((day) => {
    currentWeek.contributionDays.push(day);
    if (new Date(`${day.date}T00:00:00Z`).getUTCDay() === 6) {
      weeks.push(currentWeek);
      currentWeek = { contributionDays: [] };
    }
  });

  if (currentWeek.contributionDays.length) weeks.push(currentWeek);

  return {
    total: days.reduce((sum, day) => sum + day.contributionCount, 0),
    weeks,
  };
}

async function fetchHtmlContributions(year) {
  const targetYear = targetYearFor(year);
  const githubUrl = `https://github.com/users/${USERNAME}/contributions?to=${targetYear}-12-31`;
  const candidates = [
    { url: `/api/github-calendar-proxy?username=${USERNAME}&year=${targetYear}`, type: 'text' },
    { url: `https://api.allorigins.win/get?url=${encodeURIComponent(githubUrl)}`, type: 'json' },
    { url: `https://corsproxy.io/?${encodeURIComponent(githubUrl)}`, type: 'text' },
    { url: `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(githubUrl)}`, type: 'text' },
  ];

  const errors = [];
  for (const candidate of candidates) {
    try {
      const response = await fetchWithTimeout(candidate.url, {}, 9000);
      if (!response.ok) throw new Error(`status ${response.status}`);
      const html = candidate.type === 'json' ? (await response.json()).contents : await response.text();
      if (!html || html.length < 500) throw new Error('empty GitHub HTML');
      return parseGitHubHtml(html);
    } catch (error) {
      errors.push(`${candidate.url}: ${error.message}`);
    }
  }

  throw new Error(errors.join(' | '));
}

async function fetchContributions(year) {
  const errors = [];
  try {
    return await fetchJsonContributions(year);
  } catch (error) {
    errors.push(error.message);
  }

  try {
    return await fetchHtmlContributions(year);
  } catch (error) {
    errors.push(error.message);
  }

  throw new Error(errors.join(' | '));
}

function renderError(message) {
  const safeMessage = message.replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[char]));

  return `
    <div style="text-align:center;color:var(--text-secondary);padding:2rem;">
      Could not load real GitHub contributions right now.
      <br>
      <small style="color:var(--text-muted);">${safeMessage}</small>
    </div>
  `;
}

function renderStatus(total) {
  return `
    <div class="github-calendar-status">
      <span>${total.toLocaleString()} contributions</span>
    </div>
  `;
}

function renderWeeks({ weeks, total }) {
  const months = [];
  let dayIndex = 0;
  let previousMonth = -1;
  weeks.forEach((week, index) => {
    const first = week.contributionDays[0];
    if (!first) return;
    const month = new Date(first.date).getUTCMonth();
    if (month !== previousMonth) {
      months.push(`<span style="grid-column:${index + 2};">${MONTHS[month]}</span>`);
      previousMonth = month;
    }
  });

  return `
    <div class="github-calendar-react">
      ${renderStatus(total)}
      <div class="github-months">${months.join('')}</div>
      <div class="calendar-grid" role="grid" aria-label="GitHub contribution calendar">
        <div class="calendar-day-labels"><span>Mon</span><span>Wed</span><span>Fri</span></div>
        ${weeks.map((week) => `
          <div class="calendar-week">
            ${week.contributionDays.map((day) => {
              const delay = Math.min(dayIndex * 8, 900);
              dayIndex += 1;
              return `
                <span
                  class="ContributionCalendar-day"
                  data-level="${day.level}"
                  title="${day.contributionCount} contributions on ${day.date}"
                  style="width: 11px; height: 11px; --day-delay: ${delay}ms;"
                ></span>
              `;
            }).join('')}
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

export function renderGithubCalendar() {
  const container = document.querySelector('.calendar');
  if (!container) return;
  let activeYear = 'lastYear';

  const load = async (year) => {
    activeYear = year;
    container.innerHTML = '<div style="text-align:center;color:var(--text-secondary);padding:2rem;">Loading GitHub contributions...</div>';
    try {
      const data = await fetchContributions(year);
      container.innerHTML = renderWeeks(data);
    } catch (error) {
      container.innerHTML = renderError(error.message);
    }
  };

  document.querySelectorAll('.year-btn').forEach((button) => {
    if (button.dataset.bound === 'true') return;
    button.dataset.bound = 'true';
    button.addEventListener('click', () => {
      document.querySelectorAll('.year-btn').forEach((yearButton) => {
        const isActive = yearButton === button;
        yearButton.classList.toggle('active', isActive);
        yearButton.style.background = isActive ? 'var(--accent-primary)' : 'transparent';
        yearButton.style.color = isActive ? 'white' : 'var(--text-secondary)';
      });
      load(button.dataset.year || 'lastYear');
    });
  });

  load(activeYear);
}
