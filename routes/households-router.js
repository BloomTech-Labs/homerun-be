const router = require('express').Router();
const Households = require('../models/households-model.js');

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
  const id = req.member.current_household;
  Households.remove(id)
    .then(() => {
      res.status(200).json({ message: 'Successfully deleted household' });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
