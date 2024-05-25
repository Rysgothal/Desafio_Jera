
const { movieRouter } = require('./routers/movieRouter.js'); 
const { database } = require('./database/database.js');
const express = require('express');
const cors = require('cors');

const fs = require('fs');
const https = require('https');

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

https.createServer({
    cert: fs.readFileSync('./src/SSL/code.crt'),
    key: fs.readFileSync('./src/SSL/code.key') 
}, app).listen(3001, () => {
    console.log(`API online => https://localhost:${port}`);
});