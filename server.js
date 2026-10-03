const express = require('express');
const CORS = require('cors');

const app = express();

app.use(express.json());
app.use(CORS());

// Shared with the client's demo mode (client/src/demoApi.js)
const movies = require('./data/movies.json');

app.get('/api/movies', (req, res) => {
	res.status(200).json(movies.map(({ id, title, director, metascore }) => ({ id, title, director, metascore })));
});

app.get('/api/movies/:id', (req, res) => {
	const movie = movies.find(movie => movie.id.toString() === req.params.id);
	if (!movie) return res.status(404).json({ message: `Movie ${req.params.id} not found` });
	res.status(200).json(movie);
});

app.post('/api/movies', (req, res) => {
	if (req.body?.id !== undefined) movies.push(req.body);
	res.status(201).json(movies);
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
