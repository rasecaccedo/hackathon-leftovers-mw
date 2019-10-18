
const request = require("request");
const express = require('express');
const fs = require('fs');
const router = express.Router();

const audioMocks = {
  "reservoirDogs.mp4": "./reservoirDogs.mp3",
  "riskybusiness.mp4": "./riskybusiness.mp3",
  "redemption.mp4": "./redemption.mp3",
  "lebowski.mp4": "./lebowski.mp3",
  "9puerta.mp4": "./9puerta.mp3"
};

router.get('/', (req, res) => {
  const { query: 
    {
      url,
      timeq
    }
  } = req;
  
  request({
    method: "POST",
    uri: 'https://api.audd.io/?api_token=5f82a532c7df52bf55df47f34d1649f7&return=timecode,spotify',
    headers: {
      "Content-Type": "multipart/form-data"
    },
    formData: {
      "file": fs.createReadStream(audioMocks[url])
    },

  }, function (err, response, body) {
    if (!err && response && response.statusCode == 200) {
      const responseJSON = JSON.parse(body);
      
      const bodyResponse = {
        artist: responseJSON.result && responseJSON.result.artist,
        title: responseJSON.result && responseJSON.result.title,
        album: responseJSON.result && responseJSON.result.album,
        release_date: responseJSON.result && responseJSON.result.release_date,
        timecode: responseJSON.result && responseJSON.result.timecode,
        image: responseJSON.result && responseJSON.result.spotify && responseJSON.result.spotify.album.images[0].url,
      };
      res.setHeader('Content-Type', 'application/json');
      res.status('200').send(bodyResponse);
      res.end();
    }
  });
});
module.exports = router;
