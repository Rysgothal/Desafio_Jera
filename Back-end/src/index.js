
const express = require('express');
const { movieRouter } = require('./routers/movieRouter.js'); 
const { database } = require('./database/database.js');
const cors = require('cors');

const app = express();
const port = 3050;

app.use(express.json());
app.use(cors());
app.use('/', movieRouter);

// app.get('/', async (req, res) => {
//     res.json({
//         message: 'Servidor On-line',
//         code: 200
//     }).end();
// });

app.listen(port, async () => {
    // console.log(`API online => http://3.22.240.190:${port}`);
    console.log(`API online => http://localhost:${port}`);
    await database().init();
});