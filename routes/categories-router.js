const router = require('express').Router();
const Categories = require('../models/categories-model.js');
const { canCreateCategory } = require('../middleware/permissions.js');

function verifyCategory(req, res, next) {
  const household_id = req.member.current_household;
  const { category_name } = req.body;

  Categories.findByName(household_id, category_name)
    .then((category) => {
      console.log(category);
      if (!category) {
        next();
      } else {
        res.status(404).json({ message: 'Category Name already Exists' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

function verifyPermission(req, res, next) {
  if (canCreateCategory(req.member)) {
    next();
  } else {
    res.status(401).json({
      error:
        'the user does not have the permissions required to edit categories',
    });
  }
}

router.get('/', (req, res) => {
  const household_id = req.member.current_household;

  Categories.findByHousehold(household_id)
    .then((categories) => {
      res.status(200).json(categories);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post('/', verifyCategory, verifyPermission, (req, res) => {
  const household_id = req.member.current_household;
  const { category_name } = req.body;
  try {
    if (category_name && household_id) {
      Categories.insert(category_name, household_id)
        .then((categories) => {
          res.status(201).json(categories);
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    } else {
      res.status(400).json({
        message: 'body must include household_id and category_name',
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', verifyPermission, (req, res) => {
  const { id } = req.params;
  const { household_id } = req.member;
  Categories.findById(id).then((cat) => {
    if (cat.length > 0 && cat[0].household_id === req.member.household_id) {
      Categories.update(id, req.body, household_id)
        .then((data) => res.status(200).json(data))
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    } else {
      res
        .status(400)
        .json({ error: 'Cannot edit categories from other households' });
    }
  });
});

router.delete('/:id', verifyPermission, (req, res) => {
  const { id } = req.params;
  const { household_id } = req.member;
  Categories.findById(id).then((cat) => {
    if (cat.length > 0 && cat[0].household_id === req.member.household_id) {
      Categories.remove(id, household_id)
        .then((categories) => {
          res.status(200).json(categories);
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    } else {
      res
        .status(400)
        .json({ error: 'Cannot edit categories from other households' });
    }
  });
});

module.exports = router;
