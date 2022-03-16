const express         = require('express');
const mySqlConnection = require("../db/db");
const flash           = require('connect-flash');
const router          = express.Router();

let blogQuotes = [
    ['Ngr All Elite Design (AED) is brand extention from Ngr.'],
    ['Ngr AED nickname of All Elite Design.'],
    ['Ngr All Elite Design Is a commercial and UI/UX design service.'] ,
    ['Ngr All Elite Design created 1 January 2022, Ngr Created 1 March 2016 as SNBTR'],
    ['Ngr is a multiplatform and multi-sector service covering an international area'],
    ['Ngr founder Seth first formed Ngr as a video production.'],
    ['Ngr All Elite Design promises speed, accuracy and customer satisfaction.'],
    ['Official web Ngr nugrohoid.xyz'],
    ['UI/UX and Commercial Design.'],
    ['Website during maintance, sorry for distraction.'],
];

router.get('/', (req, res) => {
    if (!req.session.user) {
        mySqlConnection.query("SELECT * FROM blogs", function (err, blogs, fields){
        res.status(200).render('home', {blogs: blogs});
    })} else {
        res.render('logoutpage');
    }
});

router.get('/dashboard', (req, res) => {
    if (req.session.user) {
            // Select all blogs and print them:
            mySqlConnection.query("SELECT * FROM blogs", function (err, blogs, fields) {
                if (err) console.log(err);
                res.status(200).render('dashboard', {
                    blogs: blogs,
                    message: req.flash('welcome'),
                    message2: req.flash('newBlogMsg')
                });
            });
    } else {
        res.status(401).redirect('/users/login');
    }
});

router.get('/dashboard/:category', (req, res) => {
    if (req.session.user) {
            // Select all category blogs and print them:
            mySqlConnection.query("SELECT * FROM blogs WHERE category=?", [req.params.category], function (err, blogs, fields) {
                if (err) console.log(err);
                res.status(200).render('dashboardcat', {blogs: blogs});
            });
    } else {
        res.status(401).redirect('/users/login');
    }
});

router.get('/blog/:id', function(req, res) {
    const searchSql = "SELECT * FROM blogs WHERE id=?;SELECT * FROM comments WHERE blog_id=?";
    mySqlConnection.query(searchSql, [req.params.id, req.params.id], (err, blog) => {
        if (err) {
            res.status(500).redirect('/dashboard');
        } else {
            if (req.session.user) {
                let user = req.session.user;
                res.render('showblog', {blog: blog, user: user, message: req.flash('editMsg')}); 
            } else {
                res.status(401).redirect('/users/login');
            }
        }
    });
});

router.post('/blogs/:id', function(req, res) {
    if (req.session.user) {
        let user = req.session.user;
        const insertQuery = 'INSERT INTO comments (comment, author, blog_id, date) VALUES ?';
        const {comment} = req.body;
        var today = new Date();
        var date = today.getDate() + '-' + (today.getMonth()+1) + '-' + today.getFullYear();
        const data = [[comment, user.name, req.params.id, date]];
        mySqlConnection.query(insertQuery, [data], (err, result, fields) => {
            if (err) {
                res.send(err);
            } else {
                res.redirect('/blog/' + req.params.id);
            }
        });
    } else {
        res.redirect('/dashboard');
    }
});

router.delete('/blogs/:id', function(req, res){
    if (req.session.user) {
        mySqlConnection.query('DELETE FROM blogs WHERE id = ?', [req.params.id], (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.redirect('/dashboard');
            }
        });        
    } else {
        res.redirect('/users/login');
    }
});

router.get('/blogs/:id/edit', function(req, res){
    if (req.session.user) {
        const searchSql = "SELECT * FROM blogs WHERE id = ?";
        mySqlConnection.query(searchSql, [req.params.id], (err, blog) => {
            if (err) {
                console.log(err);
                res.redirect('/dashboard');
            } else {
                res.render('editblog', {blog: blog});
            }
        });
    } else {
        res.redirect('/users/login');
    }
});

router.put('/blogs/:id', function(req, res){
    const { title, image, body, category } = req.body;
    const updateQuery = 'UPDATE blogs SET title=?, category=?, blogText=?, imgURL=? WHERE id=?';
    const data = [title, category, body, image, req.params.id];
    if (req.session.user) {
        mySqlConnection.query(updateQuery, data, (err, result, fields) => {
            if (err) {
                res.redirect('/dashboard');
                console.log(err);
            } else {
                req.flash('editMsg', "Successfully edited the blog!!");
                res.redirect('/blog/' + req.params.id);
            }
        });
    } else {
        res.redirect('/users/login');
    }
});

router.get('/logout', function(req, res, next) {
    if (req.session) {
        req.session.destroy(function(err) {
            if(err) {
                res.send(err);
            } else {
                res.redirect('/');
            }
        });
    }
});

module.exports = router;