const pool = require('./pool');

async function getAllItems() {
    const { rows } = await pool.query(`
        SELECT songs.id AS song_id, songs.title, songs.artist, songs.price, 
               categories.id AS category_id, categories.name 
        FROM songs 
        LEFT JOIN categories ON songs.category_id = categories.id 
        LIMIT 20
    `);
    return rows;
}


async function getAllCategories() {
    const { rows } = await pool.query("SELECT * FROM categories");
    return rows;
}

async function getSongsFromCategory(categoryId) {
    const { rows } = await pool.query("SELECT * FROM songs INNER JOIN categories ON songs.category_id = categories.id WHERE songs.category_id = $1", [categoryId]);

    return rows;
}

async function deleteCategory(categoryId) {
    await pool.query("DELETE FROM categories WHERE id = $1", [categoryId]);
}

async function addCategory(name, description) {
    await pool.query("INSERT INTO categories (name, description) VALUES ($1, $2)", [name, description]);
}

async function addSong(title, artist, price, categoryId) {
    await pool.query("INSERT INTO songs (title, artist, price, category_id) VALUES ($1, $2, $3, $4)", [title, artist, price, categoryId])
}

async function deleteSong(songId) {
    await pool.query("DElETE FROM songs WHERE id = $1", [songId]);
}

async function updateSong(title, artist, price, categoryId, songId) {
    await pool.query("UPDATE songs SET title = $1, artist = $2, price = $3, category_id = $4 WHERE id = $5", [title, artist, price, categoryId, songId])
}

async function getSong(songId) {
    const { rows } = await pool.query("SELECT * FROM songs WHERE id = $1", [songId]);
    return rows;
}

module.exports = {
    getAllItems,
    getAllCategories,
    getSongsFromCategory,
    deleteCategory,
    addCategory,
    addSong,
    deleteSong, 
    updateSong,
    getSong
}