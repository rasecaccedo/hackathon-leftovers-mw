
const request = require("request");
const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => {
  const { query: 
    {
      url,
      time
    }
  } = req;

  const bodyResponse = {
    "artist": "Stealers Wheel 2",
    "title": "Stuck In the Middle With You",
    "album": "Reservoir Dogs(Original Motion Picture Soundtrack)",
    "release_date": "2012-11-19",
    "timecode": "00:34",
    "image": "https://i.scdn.co/image/ab67616d0000b2733018918e2e12f471df5cd6f4"
  };
  res.setHeader('Content-Type', 'application/json');
  res.status('200').send(bodyResponse);
  res.end();
  return;
  
  request({
    method: "POST",
    uri: 'https://api.audd.io/?api_token=5f82a532c7df52bf55df47f34d1649f7&return=timecode,spotify',
    headers: {
      "Content-Type": "multipart/form-data"
    },
    formData: {
      "file": fs.createReadStream("./output.mp3")
    },

  }, function (err, response, body) {
    if (!err && response && response.statusCode == 200) {
      const responseJSON = JSON.parse(body);
      const bodyResponse = {
        artist: responseJSON.result.artist,
        title: responseJSON.result.title,
        album: responseJSON.result.album,
        release_date: responseJSON.result.release_date,
        timecode: responseJSON.result.timecode,
        image: responseJSON.result.spotify.album.images[0].url,
      };
      res.setHeader('Content-Type', 'application/json');
      res.status('200').send(bodyResponse);
      res.end();
    }
  });
});
module.exports = router;
