const router = require('express').Router();
const { where } = require('sequelize');
const { Category, Product } = require('../../models');


//gets all Category including Product 
router.get('/', async (req, res) => {
  try{
    const categoryData = await Category.findAll({include:[{model: Product}],});
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//gets one Product from their ID including their Product
router.get('/:id', async (req, res) => {
    try {
      const categoryData = await Category.findByPk(req.params.id, {
        include: [{
          model: Product
        }],
      });
      if(!categoryData){
        res.status(404).json({message: 'No Category found with that id!'});
        return;
      }
      res.status(200).json(categoryData);
    }catch (err) {
      res.status(500).json(err);
    }
});

//creates a Category in the database
router.post('/', async (req, res) => {
    try {
      const categoryData = await Category.create(req.body);
      res.status(200).json(categoryData);
    } catch(err) {
      res.status(400).json(err);
    }
});

// updates one Category with its id
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    if(!categoryData[0]){
      res.status(404).json({message: 'No catergory found with that id!'});
      return;
    }
    res.status(200).json(categoryData);
  }catch(err) {
    res.status(500).json(err);
  }
});

//Deletes a Category from the database
router.delete('/:id', async (req, res) => {
    try{
      const catergoryData = await Category.destroy({where:{id: req.params.id,}});
      if(!catergoryData){
        res.status(404).json({message: 'No trip with this id!'});
        return;
      }
      res.status(200).json(catergoryData);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router
