const express = require('express');
const { moviesController } = require('../controller/movieController.js');

const movieRouter = express.Router();
const movies = new moviesController();

movieRouter.post('/account/create', movies.createAccount);
movieRouter.post('/profile/create', movies.createProfile);

module.exports = {
    movieRouter
};