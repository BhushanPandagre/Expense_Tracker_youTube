// 404 - route hi nahi mila
function notFound(req, res) {
  res.status(404).json({ message: `${req.method} ${req.originalUrl} nahi mila` });
}

// Central error handler - koi bhi unexpected error yahan aayega
function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(500).json({ message: "Server me kuch gadbad ho gayi" });
}

module.exports = { notFound, errorHandler };
