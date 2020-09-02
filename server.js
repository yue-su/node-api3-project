const express = require('express');

const postsRouter = require('./posts/postRouter')
const usersRouter = require('./users/userRouter')

const server = express();

server.use(logger)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use('/api/posts', postsRouter)
server.use('/api/users', usersRouter)
//custom middleware

function logger(req, res, next) {
  const { method, url } = req
  const time = new Date().toString().slice(15,25)
  console.log(`a ${method} request was made to ${url} at ${time}`)
  next()
}



module.exports = server;
