const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {model: Product}
    ]
  }).then((tagData) => {
    res.json(tagData);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const tagId = req.params.id;
  Tag.findByPk(tagId, {
    include: [
      {model: Product}
    ]
  }).then((tagData) => {
    res.json(tagData);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body).then((tag) => {
    res.status(201).json(tag);
  }).catch((err) => {
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    tag_name: req.body.tag_name
  },
  {
    where: {
      id: req.params.id,
    }
  }).then((updatedTag) => {
    res.json(updatedTag);
  }).catch((err) => {
    res.json(err);
  });
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json({message: "No tag with this ID found!!"});
      return;
    }
    res.status(204).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  };
});

module.exports = router;
