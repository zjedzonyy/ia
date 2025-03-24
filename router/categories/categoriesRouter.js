const express = require('express');
const db = require('../../db/queries');

const categoriesControllers = require('../../controllers/categoriesControllers');


const router = express.Router();

router.get('/', async(req, res) => {
    const items = await db.getAllCategories()
    res.render('categories', { title: 'Categories', items });
})


router.get('/:id', categoriesControllers.getSongsFromCategory);

router.post('/delete/:id',categoriesControllers.deleteCategory);
router.post('/add', categoriesControllers.addCategory);

module.exports = router;