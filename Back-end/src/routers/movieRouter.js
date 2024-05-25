const express = require('express');
const { moviesController } = require('../controller/movieController.js');

const movieRouter = express.Router();
const movies = new moviesController();

movieRouter.post('/account/create', movies.createAccount);
movieRouter.post('/account/login', movies.userLogin);
movieRouter.post('/profile/create', movies.createProfile);
movieRouter.post('/:idAccount/list-profiles', movies.getListProfiles);

module.exports = {
    movieRouter
};