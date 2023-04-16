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
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
