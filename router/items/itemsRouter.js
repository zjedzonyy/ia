const express = require('express');
const db = require('../../db/queries');
const itemsControllers = require('../../controllers/itemsControllers');



const router = express.Router();

router.get('/', itemsControllers.showAllSongs);

router.post('/add', itemsControllers.addSong);
router.post('/delete/:id', itemsControllers.deleteSong);

router.post('/edit/:id', itemsControllers.updateSong);
router.get('/edit/:id', itemsControllers.editSong);



module.exports = router;