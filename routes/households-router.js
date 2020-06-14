const router = require('express').Router();
const Households = require('../models/households-model.js');

router.post('/unlock/:id', (req, res, next) => {
  const { id } = req.params;
  if (req.body.pin) {
    Households.findById(id)
      .then((household) => {
        if (household.pin === req.body.pin) {
          res.status(200).json({ success: true });
        } else {
          res.status(400).json({ message: 'Invalid PIN' });
        }
      })
      .catch((err) => {
        next(err);
      });
  }
});

router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  Households.update(id, req.body)
    .then((household) => {
      res.status(200).json({ household });
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/', (req, res, next) => {
  const id = req.decodedToken.current_household;
  Households.remove(id)
    .then(() => {
      res.status(200).json({ message: 'Successfully deleted household' });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
