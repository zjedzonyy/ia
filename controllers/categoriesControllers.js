const db = require('../db/queries');


async function getSongsFromCategory(req, res) {
    const id = req.query.itemId;
    console.log(id);

    const results = await db.getSongsFromCategory(id);
    const category = await results.name;
    res.render('category-songs', { title: category, items: results});
}

async function deleteCategory(req, res) {
    const id = req.body.itemId;
    console.log(id);

    db.deleteCategory(id);
    res.redirect('/categories');
}

async function addCategory(req, res) {
    const name = req.body.name;
    const description = req.body.description;

    console.log(name, description);
    db.addCategory(name, description);
    res.redirect('/categories');
}


module.exports = {
    getSongsFromCategory,
    deleteCategory,
    addCategory
}