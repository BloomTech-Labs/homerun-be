const router = require('express').Router();
const Households = require('../models/households-model.js');
const { canEditHousehold } = require('../middleware/permissions.js');

function verifyPermission(req, res, next) {
  if (canEditHousehold(req.member)) {
    next();
  } else {
    res.status(401).json({
      error:
        'the user does not have the permissions required to edit households',
    });
  }
}

router.put('/', verifyPermission, (req, res, next) => {
  const id = req.member.current_household;
  Households.update(id, req.body)
    .then((household) => {
      res.status(200).json({ household });
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/', verifyPermission, (req, res, next) => {
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
