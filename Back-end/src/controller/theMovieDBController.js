class theMovieDB {
    constructor () {
        this.API_KEY = 'b3617d826e0f0c422bf57fdb53a0b418';
        this.BASE_URL = 'https://api.themoviedb.org/3';
        this.API_HEADER = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzYxN2Q4MjZlMGYwYzQyMmJmNTdmZGI1M2EwYjQxOCIsInN1YiI6IjY2NGU4NmEwNDA3YmFlZGY4MGJiMGI5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uSQBtBs8_PWjkQHeYTLFaZeGxzReLI0Dj_Os-fV2L_A';
    };

    getSearchMovie = (req, res) => {
        const query = req.params.query;

        if (!query) {
            res.status(400).send({ message: 'Faltando parametros de pesquisa' });
            return;
        };   

        const url = `${this.BASE_URL}/search/movie?query=${query}`;
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${this.API_HEADER}`
            }
          };
          
        fetch(url, options)
            .then(res => res.json())
            .then(json => res.send(json))
            .catch(err => console.error('error:' + err));
    };

    getListMovies = (req, res) => {
        const url = `${this.BASE_URL}/trending/movie/week`;
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${this.API_HEADER}`
            }
          };
          
        fetch(url, options)
            .then(res => res.json())
            .then(json => res.send(json))
            .catch(err => console.error('error:' + err));
    };  
};

module.exports = {
    theMovieDB
};