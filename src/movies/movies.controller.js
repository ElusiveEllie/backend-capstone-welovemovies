const knex = require("../db/connection");
const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  const isShowing = req.query.is_showing;
  const movies = await moviesService.list(isShowing);
  res.json({ data: movies });
}

async function movieExists(req, res, next) {
  const movie = await moviesService.read(req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: `Movie cannot be found.` });
}

async function read(req, res, next) {
  const movie = res.locals.movie;
  res.json({ data: movie });
}

async function listTheaters (req, res, next) {
  const theaters = await moviesService.listMovieTheaters(req.params.movieId);
  res.json({ data: theaters });
}

async function listReviews (req, res, next) {
  const reviews = await moviesService.listMovieReviews(req.params.movieId);
  res.json({ data: reviews });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
  theaters: [asyncErrorBoundary(listTheaters)],
  reviews: [asyncErrorBoundary(listReviews)],
};
