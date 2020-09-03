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
  posts.getById(req.params.id)
    .then(post => {
    post ? res.status(200).json(post) : res.status(404).json({message: 'post not found'})
    })
  .catch(err => res.status(500).json({message: 'Error retriving the post'}))
});

router.delete('/:id', (req, res) => {
  posts.remove(req.params.id)
  .then(post => res.status(200).json(post))
});

router.put('/:id', (req, res) => {
  posts.update(req.body)
    .then(post => res.status(200).json(post))
    .catch(err => {
      console.log(err)
      res.status(500).json({error: "error"})
    })
});

router.post('/', validatePostId, (req, res) => {
    res.status(201).json(req.post)
})

// custom middleware

function validatePostId(req, res, next) {
  posts.insert(req.body)
    .then(post => {
      if (post) {
        req.post = post
        next()
      }
  })
}

module.exports = router;
