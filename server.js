const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.url);

    res.setHeader('Content-Type', 'text/html')
    
    let path = './views/';
    switch (req.url) {
        case '/':
            path += 'table.html';
            res.statusCode = 200;
            break;
        case '/list':
            path += 'list.html';
            res.statusCode = 200;
            break;
        case '/list-me':    // redirect
            res.statusCode = 301;
            res.setHeader('Location', '/list');
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
    }

    const fs = require('fs');
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            res.write(data);
            res.end();
        }
    })

});

server.listen(5000, 'localhost', () => {
    console.log('listening for requests of port 5000');
})