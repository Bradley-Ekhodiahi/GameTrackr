import express from 'express'; // install express framework to build web app
import axios from 'axios'; // axios http client for API requests 
import cors from 'cors'; // middleware for front end requests from different origins

// create an express app on the port 5000
const app = express();
const PORT = 5000;

// credentials for IGDB and access token that gets refreshed every time for API acess
const clientId = '840q6o6x0grpvbnr8qjt3c4bwxq3pw';
const clientSecret = '8x0429toc2k5rxontjdmxziqkqivaf';
let accessToken = '';

// enable cors within app
app.use(cors());

// fetches new access token and stores it, logs if it is successful or not
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
    console.log(" Access Token Refreshed:", accessToken);
  } catch (error) {
    console.error(' Error fetching access token:', error.response?.data || error.message);
  }
};

// middleware to make sure there is an access token before proceeding to use API
const ensureAccessToken = async (req, res, next) => {
  if (!accessToken) {
    await getAccessToken();
  }
  next();
};

// fetch 10 random games to be displayed on the home page every time it's refreshed
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
    console.error('Error fetching games:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch games' });
  }
});

// fetches the name, cover, rating and release date of a game for when clicked on
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
    console.error(' Error fetching game details:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch game details' });
  }
});
// route for searching the api for a game, give an error if there is no query, gives up to 20 results for a matched term
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
    res.json(response.data); // return 20 games in JSON format
  } catch (error) {
    console.error("IGDB API Error:", error);
    res.status(500).json({ error: "Failed to fetch data from IGDB" });
  }
});

// start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
