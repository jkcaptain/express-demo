const app = require('express')();
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
})

app.listen(8888, () => {
    console.log('Example app listening on port 8888!')
});