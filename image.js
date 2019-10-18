
'use strict';

const vision = require('@google-cloud/vision');

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
  faces.forEach((face, i) => {
    console.log(`  Face #${i + 1}:`);
    console.log(`    Joy: ${face.joyLikelihood}`);
    console.log(`    Anger: ${face.angerLikelihood}`);
    console.log(`    Sorrow: ${face.sorrowLikelihood}`);
    console.log(`    Surprise: ${face.surpriseLikelihood}`);
  });
}