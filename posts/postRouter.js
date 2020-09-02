const express = require('express');

const posts = require('./postDb')
const router = express.Router();

router.get('/', (req, res) => {
  posts.get(req.query)
    .then(posts => {
    res.status(200).json(posts)
    })
    .catch(err => {
      res.status(500).json({
      message: 'Error retriving the posts'
    })
  })
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
