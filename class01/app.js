const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({ dest: '/tmp/' }).array('image'));

// 中间件
app.use(express.static('public'));

// 
app.get('/', (req, res) => {
    console.dir(req.query);
    res.send('Hello World!')
});

// 使用模板
app.get('/tpl', (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`);
});

// 返回一个 json
app.get('/json', (req, res) => {
    res.json({
        name: 'jk',
        age: 26
    });
});

// 定义一个 post 请求
app.post('/search', (req, res) => {
    let { search } = req.body;
    // 跳转到百度搜索
    res.redirect('https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=' + search + '&rsv_pq=946740b200025cd9&rsv_t=1743eVOPB4n6RtORMgAy8xVJsgEZcF63pK%2FN%2Bw7gCQ7fh9SKsC0CQDcPj%2F8&rqlang=cn&rsv_enter=0&inputT=1946&rsv_sug4=2331')
});

// 上传文件
app.post('/upload', (req, res) => {
    const [file] = req.files;
    const rootPath = '/static';
    const fileParentPath = `${__dirname}/${rootPath}`;
    const desFile = `${fileParentPath}/${file.originalname}`;

    // 写入文件
    const appendFile = () => {
        fs.readFile(file.path, (err, data) => {
            fs.writeFile(desFile, data, err => {
                let result = {};
                if (err) {
                    console.error(err);
                } else {
                    result = {
                        message: 'File uploaded successfully',
                        filename: file.originalname
                    }
                }
                console.log(result);
                res.json(result);
            });
        });
    };

    // 如果目录不存在，就创建目录
    fs.access(fileParentPath, err => {
        if (err) {
            console.log('目录不存在');
            console.log(err);
            fs.mkdir(fileParentPath, err => {
                appendFile();
            });
        } else {
            console.log('目录存在');
            appendFile();
        }
    });
});

app.listen(8888, () => {
    console.log('Example app listening on port 8888!')
});