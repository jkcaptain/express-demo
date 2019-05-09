const app = require('express')();


app.get('/', (req, res, next) => {
    console.log('before');
    next();
}, (req, res, next) => {
    res.send('Hello indexTest get');
    next();
}, (req, res) => {
    console.log('这里不会执行了');
});

app.route('/test')
    .get((req, res) => {})
    .post((req, res) => {})
    .put((req, res) => {})
    .delete((req, res) => {})

app.listen(8888, () => {
    console.log('Example app listening on port 8888!')
});