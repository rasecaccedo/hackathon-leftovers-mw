const express = require('express');

const audio = require("./audio");
const app = express();
const port = process.env.PORT || 3001;

const router = express.Router();

router.use('/audio', audio);

app.use(router);

app.get('/image', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))