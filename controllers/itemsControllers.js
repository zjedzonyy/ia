const db = require('../db/queries');


async function showAllSongs(req, res) {
    const categories = await db.getAllCategories();
    const items = await db.getAllItems();

    res.render('items', { title: 'Items', items, categories });
}

async function addSong(req, res) {
    const title = req.body.title;
    const artist = req.body.artist;
    const price = parseInt(req.body.price);
    let category = parseInt(req.body.category);
    if (category === -1) {
        category = null;
    }

    console.log(title, artist, price, category);
    await db.addSong(title, artist, price, category);
    res.redirect('/items')
}

async function deleteSong(req, res) {
    console.log(req.body);
    console.log(req.body.itemId);
    const id = parseInt(req.body.itemId);
    console.log(id);

    await db.deleteSong(id);
    res.redirect('/items');
}

async function updateSong(req, res) {
    const songId = req.body.songId;
    const title = req.body.title;
    const artist = req.body.artist;
    const price = parseInt(req.body.price);
    let category = parseInt(req.body.category);
    if (category === -1) {
        category = null;
    }


    await db.updateSong(title, artist, price, category, songId);
    res.redirect('/items')
}

async function editSong(req, res) {
    const songId = req.query.itemId;
    const song = await db.getSong(songId);

    const categories = await db.getAllCategories();


    res.render('edit-song', { title: 'Edit Song', song, categories });
}


module.exports = {
    showAllSongs,
    addSong,
    deleteSong,
    updateSong,
    editSong
}