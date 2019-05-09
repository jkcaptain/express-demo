const app = require('express')();

const one = (req, res, next) => {
    console.log('>> one');
    next();
    console.log('<< one');
}

const two = (req, res, next) => {
    console.log('>> two');
    // next();
    console.log('<< two');
}

const three = (req, res, next) => {
    console.log('>> three');
    next();
    console.log('<< three');
}

app.use(one);
app.use(two);
app.use(three);

app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen(8888, () => {
    console.log('Example app listening on port 8888!')
});


