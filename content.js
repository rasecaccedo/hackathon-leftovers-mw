
const express = require('express');
const router = express.Router();

const contentMock = [
  {
    "id": "reservoirDogs.mp4",
    "title": "Reservoir Dogs",
    "video": "https://www.dropbox.com/s/qnh8ej1mchuxvfx/reservoirDogs4.mp4?dl=1",
    "image": "http://t3.gstatic.com/images?q=tbn:ANd9GcTPwt7t2o-jpIcQRIx-6wWtPQqTcrFQmBku_q6QTfPjyN2-5sS-"
  },
  {
    "id": "riskybusiness.mp4",
    "title": "Risky Business",
    "video": "https://www.dropbox.com/s/55nhbrbt6w49ar2/riskybusiness.mp4?dl=1",
    "image": "https://www.cinehorizons.net/sites/default/files/affiches/2002114110-risky_business.jpg"
  },
  {
    "id": "redemption.mp4",
    "title": "The Shawshank Redemption",
    "video": "https://www.dropbox.com/s/gw7b2t8szefl7ql/redemption.mp4?dl=1",
    "image": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/3290/3290236_sa.jpg;maxHeight=640;maxWidth=550"
  },
  {
    "id": "lebowski.mp4",
    "title": "The Big Lebowski",
    "video": "https://www.dropbox.com/s/ct0e259zibxwbyb/lebowski.mp4?dl=1",
    "image": "https://posteritati.com/posters/000/000/051/942/the-big-lebowski-md-web.jpg"
  },
  {
    "id": "9puerta.mp4",
    "title": "9th Door",
    "video": "https://www.dropbox.com/s/e1iwmnonxer625p/9puerta.mp4?dl=1",
    "image": "https://imagessl9.casadellibro.com/m/ig/9/2088549.jpg"
  },
];

router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.status('200').send(contentMock);
  res.end();
});
module.exports = router;
