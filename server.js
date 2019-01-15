const express = require ('express');
const hbs = require ('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials (__dirname + '/views/partials')
app.set ('view engine', 'hbs');

app.use ((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log (log);
    fs.appendFile ('server.log', log + '\n', (err) => {});
    next();     //next() tells app that middleware is done and app can  continue to run
})

// app.use ((req, res, next) => {
//     res.render ('maintenance.hbs', {
//         pageTitle: 'Under Construction'
//     });   
// })

app.use (express.static(__dirname + '/public'));             //middleware

hbs.registerHelper ('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper ('screamIt', (text) => {
    return text.toUpperCase();
});

app.get ('/', (req, res) => {
    //res.send ('<h1>Hello Express!</h1>');
    res.render ('home.hbs', {
        pageTitle: 'Home page',
        name: 'Dave',
        welcomeMessage: 'Welcome to my nightmare',
        likes: ['Music', 'Cartoons']
    });
 });

app.get ('/about', (req, res) => {
    res.render ('about.hbs', {
        pageTitle: 'About page',
    });
});

app.get ('/projects', (req, res) => {
    res.render ('projects.hbs', {
        pageTitle: 'Projects page',
    });
});

app.get ('/bad', (req, res) => {
    res.send ({
        errorMessage: 'Error handling request'
    });
});

app.listen (port, () => { 
    console.log (`Server is up on port ${port}`);
});