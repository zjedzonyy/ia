const express = require('express');
const categoriesRouter = require('./router/categories/categoriesRouter');
const itemsRouter = require('./router/items/itemsRouter');


const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server has started listening on port ${PORT}`);
})


app.get('/', (req, res) => {
    res.render('index', {title: 'Home'});
})


app.use('/categories', categoriesRouter);
app.use('/items', itemsRouter);


