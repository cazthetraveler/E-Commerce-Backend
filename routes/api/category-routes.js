const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [
      {model: Product}
    ]
  }).then((categoryData) => {
    res.json(categoryData);
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const categoryId = req.params.id;
  Category.findByPk(categoryId, {
    include: [
      {model: Product}
    ]
  }).then((categoryData) => {
    res.json(categoryData);
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body).then((category) => {
    res.status(201).json(category);
  }).catch((err) => {
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    category_name: req.body.category_name
  },
  {
    where: {
      id: req.params.id,
    }
  }).then((updatedCategory) => {
    res.json(updatedCategory);
  }).catch((err) => {
    res.json(err);
  });
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData[0]) {
      res.status(404).json({message: "No category with this ID found!!"});
      return;
    }
    res.status(204).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  };
});

module.exports = router;
