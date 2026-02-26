// api/github-contributions.js

export default async function handler(req, res) {
    // Add CORS headers so your frontend can call this API
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        const { username, year } = req.query;

        if (!username || !year) {
            return res.status(400).json({ error: 'Username and year are required' });
        }

        const token = process.env.GITHUB_PAT;
        if (!token) {
            return res.status(500).json({ error: 'GitHub PAT is not configured on the server.' });
        }

        // Calculate the date range for the requested year
        // GitHub GraphQL expects ISO Strings
        const fromDate = new Date(`${year}-01-01T00:00:00Z`).toISOString();
        const toDate = new Date(`${year}-12-31T23:59:59Z`).toISOString();

        const query = `
            query($userName: String!, $from: DateTime!, $to: DateTime!) {
                user(login: $userName) {
                    contributionsCollection(from: $from, to: $to) {
                        contributionCalendar {
                            totalContributions
                            weeks {
                                contributionDays {
                                    contributionCount
                                    date
                                }
                            }
                        }
                    }
                }
            }
        `;

        const variables = {
            userName: username,
            from: fromDate,
            to: toDate
        };

        const response = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query, variables }),
        });

        if (!response.ok) {
            console.error("GitHub API Error", response.status, await response.text());
            throw new Error(`GitHub API returned status ${response.status}`);
        }

        const data = await response.json();

        if (data.errors) {
            console.error("GraphQL Errors:", data.errors);
            return res.status(400).json({ error: 'Error fetching GraphQL data', details: data.errors });
        }

        const calendar = data.data.user.contributionsCollection.contributionCalendar;

        // Return clean JSON to our frontend UI
        res.status(200).json({
            total: calendar.totalContributions,
            weeks: calendar.weeks
        });

    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
