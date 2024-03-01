const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

//gets all Tags with a its product if has one stored
router.get('/', async (req, res) => {
  try{
    const TagData = await Tag.findAll({include:[{model: Product}]});
    res.status(200).json(TagData);
  }catch(err){
    res.status(500).json(err);
  }
});

//request one Tag with is id and including it product
router.get('/:id', async (req, res) => {
  try{
  const TagData = await Tag.findByPk(req.params.id,{
    include: [{model: Product}]
  });
  if(!TagData){
    res.status(404).json({message: 'No tag found with that id!'});
    return;
  }
  res.status(200).json(TagData);
}catch(err){
  res.status(500).json(err);
}
});

router.post('/', async (req, res) => {
  try{
    const TagData = await Tag.create(req.body);
    res.status(200).json(TagData);
  }catch(err) {
    res.status(500).json(err);
  }
});

//updates a Tag with their id
router.put('/:id', async (req, res) => {
  try{
    const TagData = await Tag.update(req.body,{where: {id: req.params.id}});
    if(!TagData){
      res.status(404).json({message: 'No tag found with that id!'});
      return;
    }
    res.status(200).json(TagData);
  }catch(err){
    res.status(500).json(err);
  }
});

//delete a Tag from the database
router.delete('/:id', async (req, res) => {
  try{
    const TagData = await Tag.destroy({where: {id: req.params.id}});
    if(!TagData){
      res.status(404).json({message: 'No tag found with that id!'});
      return;
    }
    res.status(200).json(TagData);
  }catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;





















router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product,
        through: ProductTag,
        as: 'productTag_product'
      }
    ]
  }).then(TagData => res.json(TagData)).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        through: ProductTag,
        as: 'productTag_product'
      }
    ]
  }).then(TagData => {
    if(!TagData) {
      res.status(404).json({message: 'No Category was found with that ID'});
      return;
    }
    res.json(TagData)
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  }).then(TagData => res.json(TagData)).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
      Tag.update({
        tag_name: req.body.tag_name
      },
      {
        where: {
          id: req.params.id
        }
      }
    ).then(TagData => {
      if(!TagData) {
        res.status(404).json({message: 'No Tag was found with that ID'});
        return;
      }
      res.json(TagData);
    }).catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then(TagData => {
    if(!TagData) {
      res.status(404).json({message: 'No Tag was found with that ID'});
      return;
    }
    res.json(TagData);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
