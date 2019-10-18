
const request = require("request");
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const { query: 
    {
      url,
      time
    }
  } = req;
  const data = {
    'return': 'timecode,spotify',
    'api_token': '5f82a532c7df52bf55df47f34d1649f7'
  };
  res.setHeader('Content-Type', 'application/json');
  res.status('200').send("hola");
  res.end();
  return;
  request({
    uri: 'https://api.audd.io/',
    form: data,
    method: 'POST'
  }, function (err, res, body) {
    console.log(body);
  });
});
module.exports = router;
