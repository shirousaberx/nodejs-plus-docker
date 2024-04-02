// express js routing

const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// connect to mongodb
const dbURI = "mongodb+srv://shirousaber:Log4jbreach@cluster0.avfvigc.mongodb.net/node-tuts?retryWrites=true&w=majority"
mongoose.connect(dbURI)
    .then((result) => app.listen(5000)) // listen for requests
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');
app.set('views', 'express_views');    // use if ejs files are not placed in views folder

// static files
app.use(express.static('public'));  // "public" folder made available to browser

// logging middleware
// app.use((req, res, next) => {
//     console.log('new request made:');
//     console.log('host: ', req.hostname);
//     console.log('path: ', req.path);
//     console.log('method: ', req.method);
//     next();     // pass to the next route
// });

app.use(express.urlencoded({ extended: true }));    // makes req.body available

// =============================================================
// just for testing mongoose

// mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    });

    blog.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
})

// get all blogs from mongodb
app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
});

// get blog by id
app.get('/find-blog', (req, res) => {
    Blog.findById('65aba8988322fa10a7921473')
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err)
        })
});

// =============================================================

app.get('/', (req, res) => {
    // res.send('hello'); // use this instead of res.write()
    // res.sendFile('./views/table.html', { root: __dirname }); // use this if without view engine
    
    // const blogs = [
    //     {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    // ];
    // res.render('index', { title: 'Home', blogs });

    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
// must be placed at the bottom
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
})