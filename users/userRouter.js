const express = require("express")

const users = require("./userDb")

const router = express.Router()

router.post("/", validateUser, (req, res) => {
  users
    .insert(req.body)
    .then((user) => {res.status(201).json(user)})
    .catch((err) => {
      console.log(err)
      res.status(500).json({ message: "error" })
    })
})

router.post("/:id/posts", (req, res) => {
  // do your magic!
})

router.get("/", (req, res) => {
  users
    .get(req.query)
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(500).json({ message: "Error retriving users" }))
})

router.get("/:id", validateUserId, (req, res) => {
  res.status(200).json(req.user)
  // do your magic!
})

router.get("/:id/posts", (req, res) => {
  users.getUserPosts(req.params.id)
    .then(posts => res.status(200).json(posts))
  .catch(err => res.status(404).json({error: 'error'}))
  // do your magic!
})

router.delete("/:id", (req, res) => {
  // do your magic!
})

router.put("/:id", (req, res) => {
  // do your magic!
})

//custom middleware

function validateUserId(req, res, next) {
  const id = req.params.id
  users.getById(id)
    .then(user => {
      if (user) {
        req.user = user
        next()
      } else res.status(400).json({ message: 'invalid user id' })
  }).catch(err => res.status(500).json({message: 'Error retriving user'}))
}

function validateUser(req, res, next) {
  console.log(req.body)
  if (req.body) {
    if (req.body.name) {
      next()
    }
  }
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router
