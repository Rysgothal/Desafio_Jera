const express = require('express');
const { moviesController } = require('../controller/movieController.js');
const { theMovieDB } = require('../controller/theMovieDBController.js');

const Router = express.Router();
const movieController = new moviesController();
const movieDB = new theMovieDB();

Router.post('/account/create', movieController.createAccount);
Router.post('/account/login', movieController.userLogin);
Router.post('/profile/create', movieController.createProfile);
Router.get('/:idAccount/list-profiles', movieController.getListProfiles);
Router.post('/profile/edit', movieController.editProfile);
Router.delete('/profile/delete/:idProfile', movieController.removeProfile);

Router.get('/movies/list/:query', movieDB.getSearchMovie);
Router.get('/movies', movieDB.getListMovies);

module.exports = {
    Router
};