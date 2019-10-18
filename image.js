
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


const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

async function detectWeb(fileName) {
  // [START vision_web_detection]

  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */
  // const fileName = 'Local image file, e.g. /path/to/image.png';

  // Detect similar images on the web to a local file
  const [result] = await client.webDetection(fileName);
  const webDetection = result.webDetection;
  console.log("JSON WEB: ", webDetection);
  if (webDetection.fullMatchingImages.length) {
    console.log(
      `Full matches found: ${webDetection.fullMatchingImages.length}`
    );
    webDetection.fullMatchingImages.forEach(image => {
      console.log(`  URL: ${image.url}`);
      console.log(`  Score: ${image.score}`);
    });
  }

  if (webDetection.partialMatchingImages.length) {
    console.log(
      `Partial matches found: ${webDetection.partialMatchingImages.length}`
    );
    webDetection.partialMatchingImages.forEach(image => {
      console.log(`  URL: ${image.url}`);
      console.log(`  Score: ${image.score}`);
    });
  }

  if (webDetection.webEntities.length) {
    console.log(`Web entities found: ${webDetection.webEntities.length}`);
    webDetection.webEntities.forEach(webEntity => {
      console.log(`  Description: ${webEntity.description}`);
      console.log(`  Score: ${webEntity.score}`);
    });
  }

  if (webDetection.bestGuessLabels.length) {
    console.log(
      `Best guess labels found: ${webDetection.bestGuessLabels.length}`
    );
    webDetection.bestGuessLabels.forEach(label => {
      console.log(`  Label: ${label.label}`);
    });
  }
  // [END vision_web_detection]
}


async function detectFaces(fileName) {
  // [START vision_face_detection]
  // Imports the Google Cloud client library

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */
  // const fileName = 'Local image file, e.g. /path/to/image.png';

  const [result] = await client.faceDetection(fileName);
  console.log('FACES!!! ', result);
  const faces = result.faceAnnotations;
  console.log(`Found ${faces.length} faces in the frame`);
  let facesList = [];
  faces.forEach((face, i) => {
    console.log(`  Face #${i + 1}:`);
    console.log(`    Joy: ${face.joyLikelihood}`);
    console.log(`    Anger: ${face.angerLikelihood}`);
    console.log(`    Sorrow: ${face.sorrowLikelihood}`);
    console.log(`    Surprise: ${face.surpriseLikelihood}`);
  });

  return facesList;
}