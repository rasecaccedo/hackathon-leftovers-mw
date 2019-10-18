const express = require('express');

const audio = require("./audio");
const image = require("./image");
const app = express();
const port = process.env.PORT || 3001;

const router = express.Router();

router.use('/audio', audio);
router.use('/image', image);

app.use(router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))