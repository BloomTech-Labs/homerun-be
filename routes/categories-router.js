const router = require('express').Router();
const Categories = require('../models/categories-model.js');

const validateHousehold = (req, res, next) => {
  try {
    const { household_id } = req.body;
    Categories.findByHousehold(household_id)
      .then(() => {
        next();
      })
      .catch((err) => res.status(404).json({ error: err }));
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Categories.findByHousehold(id)
    .then((categories) => {
      res.status(200).json(categories);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post('/', validateHousehold, (req, res) => {
  const { category_name, household_id } = req.body;
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
