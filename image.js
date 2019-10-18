
const request = require("request");
const express = require('express');
const { exec } = require('child_process');

const router = express.Router();



const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

async function detectWeb(filePath, fileName, res, req) {
  const [result] = await client.webDetection(filePath);
  const webDetection = result.webDetection;
  const [resultFaces] = await client.faceDetection(filePath);
  console.log('FACES!!! ', resultFaces);
  const faces = resultFaces.faceAnnotations;

  console.log("Web Labels Detection: ", webDetection);
  console.log("Faces Detection: ", faces.length);
  // if (webDetection.fullMatchingImages.length) {
  //   console.log(
  //     `Full matches found: ${webDetection.fullMatchingImages.length}`
  //   );
  //   webDetection.fullMatchingImages.forEach(image => {
  //     console.log(`  URL: ${image.url}`);
  //     console.log(`  Score: ${image.score}`);
  //   });
  // }

  // if (webDetection.webEntities.length) {
  //   console.log(`Web entities found: ${webDetection.webEntities.length}`);
  //   webDetection.webEntities.forEach(webEntity => {
  //     console.log(`  Description: ${webEntity.description}`);
  //     console.log(`  Score: ${webEntity.score}`);
  //   });
  // }

  if (webDetection.bestGuessLabels.length) {
    console.log(
      `Best guess labels found: ${webDetection.bestGuessLabels.length}`
    );
    webDetection.bestGuessLabels.forEach(label => {
      console.log(`  Label: ${label.label}`);
    });
  }
  
  if (faces.length === 1) {
    res.status('200').send({
      faceGuessName: webDetection.webEntities[0].description,
      faceBoundingPoly: faces[0].boundingPoly,
      image: `http://leftovers-hackaton.herokuapp.com/${fileName}`     
    });
  } else {
    res.status('404').send("No face detected");
  }
  res.end();
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
    //const dimensions = calculateDimensions(face.faceBoundingPoly.vertices);
  });

  return facesList;
}

calculateDimensions = (vertices) => {
  const x = vertices[0].x;
  const y = vertices[4].y;
  const width = vertices[3].x - vertices[0].x;
  const height = vertices[3].y - vertices[0].y; 
}

router.get('/', async (req, res) => {
  const { query: 
    {
      url,
      time,
      id
    }
  } = req;
  res.setHeader('Content-Type', 'application/json');
  try {
    exec(`ffmpeg -y -ss ${time} -i ${url} -vframes 1 -q:v 2 output.jpg`, async (err, stdout, stderr) => {
      if (!err) {
        try {
          await detectWeb(`./output.jpg`, `${id.substr(0, id.indexOf("."))}.png`, res, req);
        } catch (eror) {
          res.status('404').send("No face detected");
        }
      } else {
        res.status('404').send("No face detected");
        res.end();
        return;
      }
    });
  } catch(error) {
    console.log('ERROR');
    res.status('404').send("No face detected");
    res.end();
  }
  
});

module.exports = router;