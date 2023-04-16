const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  const tag = await Tag.findAll({
    include: [Product]
  })
  res.send(tag)
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  const tag_id = req.params.id;
  const include_products = req.query.tag_id;

  if(tag_id) {
    const tag = await Tag.findOne({
      include: Product,
      where: {
        id: tag_id
      }
    })
    res.send(tag);
  }else res.send ("Cannot find Tag with associated Products")
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((tag) => {
      if (req.body.length) {
        const arr = req.body.tagIds.map((tag_id) => {
          return {
            tag_id: tag.id
          };
        });
        return ProductTag.bulkCreate(arr);
      }
      res.status(200).json(tag);
    })
    .then((ids) => res.status(200).json(ids))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
  
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((updatedTag) => res.json(updatedTag))
    .catch((err) => {
      res.status(400).json(err);
    });

});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(TagDeleted => {
    console.log("Tag successfully deleted")
    res.status(204).send();
  })
  .catch(error => {
    console.log("error")
    res.status(500).send({ error: 'Failed to delete tag' });
  })
});

module.exports = router;
