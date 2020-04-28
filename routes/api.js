const express = require('express');

const router = express.Router()

const BlogPost = require('../models/blogPost')

// Routes
router.get('/', (req, res) => {

  BlogPost.find({ })
    .then((data) => {
      console.log('Data:', data)
      res.json(data);
    })
    .catch((error) => {
      console.log('Error:', error)
    })
});

router.post('/save', (req, res) => {
  console.log('Request body', req.body);
  const data = req.body;

  const newBlogPost = new BlogPost(data);

  newBlogPost.save((error) => {
    if (error) {
      res.status(500).json({ msg: 'Sorry, there was an error.'})
      return;
    }
    return res.json({
        msg: 'Your data was saved!'
      });
  });
});

router.get('/name', (req, res) => {
  const data = {
    username: 'bananaman',
    age: 32
  };
  res.json(data);
});

module.exports = router;
