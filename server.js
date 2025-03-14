import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000; // Use Render's port or default to 5000

const clientId = '840q6o6x0grpvbnr8qjt3c4bwxq3pw';
const clientSecret = '8x0429toc2k5rxontjdmxziqkqivaf';
let accessToken = '';

// Enable CORS for frontend requests
app.use(cors());
app.use(express.json());
// Fetch a fresh access token
const getAccessToken = async () => {
  try {
    const response = await axios.post('https://id.twitch.tv/oauth2/token', null, {
      params: {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'client_credentials',
      },
    });
    accessToken = response.data.access_token;
    console.log("✅ Access Token Refreshed:", accessToken);
  } catch (error) {
    console.error('❌ Error fetching access token:', error.response?.data || error.message);
  }
};

// Middleware to ensure access token is set
const ensureAccessToken = async (req, res, next) => {
  if (!accessToken) {
    await getAccessToken();
  }
  next();
};

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Fetch game list (randomized)
app.get('/api/games', ensureAccessToken, async (req, res) => {
  const offset = Math.floor(Math.random() * 100);

  try {
    const response = await axios.post(
      'https://api.igdb.com/v4/games',
      `fields name, cover.image_id, rating, release_dates.date;
       where rating != null; limit 10; offset ${offset};`,
      {
        headers: {
          'Client-ID': clientId,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('❌ Error fetching games:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch games' });
  }
});

// Fetch specific game details
app.get('/api/games/:id', ensureAccessToken, async (req, res) => {
  const gameId = req.params.id;

  try {
    const response = await axios.post(
      'https://api.igdb.com/v4/games',
      `fields name, cover.image_id, rating, release_dates.date;
       where id = ${gameId};`,
      {
        headers: {
          'Client-ID': clientId,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    res.json(response.data[0] || {});
  } catch (error) {
    console.error('❌ Error fetching game details:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch game details' });
  }
});

app.get("/api/search", async (req, res) => {
  const query = req.query.query; // Get search query from URL
  if (!query) return res.status(400).json({ error: "Query parameter is required" });

  try {
    const response = await axios.post(
      "https://api.igdb.com/v4/games",
      `fields name, cover.image_id, rating;
       search "${query}";
       limit 20;`,
      {
        headers: {
          "Client-ID": clientId,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("IGDB API Error:", error);
    res.status(500).json({ error: "Failed to fetch data from IGDB" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
