
const { movieRouter } = require('./routers/movieRouter.js'); 
const { database } = require('./database/database.js');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3050;

app.use(express.json());
app.use(cors());
app.use('/', movieRouter);

app.get('/', (req, res) => {
    res.send({
        status: "OK",
        code: 200
    });
});

app.listen(port, async () => {
    console.log(`API online => http://18.219.160.242:${port}`);
    await database().init();
});