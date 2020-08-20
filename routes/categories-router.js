const router = require('express').Router();
const Categories = require('../models/categories-model.js');

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

router.post('/', verifyCategory, (req, res) => {
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

router.put('/:id', (req, res) => {
  const { id } = req.params;
  Categories.update(id, req.body)
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Categories.remove(id)
    .then((categories) => {
      res.status(200).json(categories);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
