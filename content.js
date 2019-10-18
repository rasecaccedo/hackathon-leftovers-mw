
const express = require('express');
const router = express.Router();

const contentMock = [
  {
    "id": "reservoirDogs.mp4",
    "video": "",
    "image": "http://t3.gstatic.com/images?q=tbn:ANd9GcTPwt7t2o-jpIcQRIx-6wWtPQqTcrFQmBku_q6QTfPjyN2-5sS-"
  },
  {
    "id": "riskybusiness.mp4",
    "video": "",
    "image": "https://www.cinehorizons.net/sites/default/files/affiches/2002114110-risky_business.jpg"
  },
  {
    "id": "redemption.mp4",
    "video": "",
    "image": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/3290/3290236_sa.jpg;maxHeight=640;maxWidth=550"
  },
  {
    "id": "lebowski.mp4",
    "video": "",
    "image": "https://posteritati.com/posters/000/000/051/942/the-big-lebowski-md-web.jpg"
  },
  {
    "id": "9puerta.mp4",
    "video": "",
    "image": "https://imagessl9.casadellibro.com/m/ig/9/2088549.jpg"
  },
];

router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.status('200').send(contentMock);
  res.end();
});
module.exports = router;
