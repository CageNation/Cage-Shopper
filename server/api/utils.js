// Utility functions/middlewares for our API routes

const checkUser = (req, res, next) => {
  if (!req.user || req.user.id !== +req.params.id) {
    res
      .status(403)
      .send('THOU ART FORBIDDEN FROM THEE DOMAIN! TO THE CLINK WITH YE!')
  } else {
    next()
  }
}

module.exports = {checkUser}
