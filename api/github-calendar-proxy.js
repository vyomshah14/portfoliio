export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        const { username, year } = req.query;

        if (!username || !year) {
            return res.status(400).send('Username and year are required');
        }

        const url = `https://github.com/users/${username}/contributions?to=${year}-12-31`;

        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html'
            }
        });

        if (!response.ok) {
            console.error("Fetch Error:", response.status);
            throw new Error(`GitHub returned status ${response.status}`);
        }

        const html = await response.text();
        res.setHeader('Content-Type', 'text/html');
        // Aggressive Cache-Control to ensure the edge network doesn't cache stale graphs for dynamic users
        res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
        res.status(200).send(html);

    } catch (error) {
        console.error('Proxy Error:', error);
        res.status(500).send('Internal Server Error while fetching GitHub HTML');
    }
}
