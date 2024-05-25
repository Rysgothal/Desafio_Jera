
const express = require('express');
const { movieRouter } = require('./routers/movieRouter.js'); 
const { database } = require('./database/database.js');
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
    console.log(`API online => http://52.15.70.23:${port}`);
    await database().init();
});