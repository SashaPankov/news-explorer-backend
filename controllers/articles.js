const article = require("../models/article");
const Errors = require("../utils/errors");
const HTTPForbidden = require("../utils/httpforbidden");
const HTTPBadRequest = require("../utils/httpbadrequest");
const HTTPNotFound = require("../utils/httpnotfound");

module.exports.getArticles = (req, res, next) => {
  article
    .find({ owner: req.user._id }, { owner: 0 })
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const ownerId = req.user._id;
  const { keyword, title, text, date, source, link, image } = req.body;

  article
    .create({
      keyword,
      title,
      text,
      date,
      source,
      link,
      image,
      owner: ownerId,
    })
    .then((newsArticle) => res.send({ data: newsArticle }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new HTTPBadRequest(Errors.defaultBadRequestMessage));
      } else {
        next(err);
      }
    });
};

module.exports.deleteArticle = (req, res, next) => {
  const { articleId } = req.params;
  article
    .findById(articleId)
    .orFail(() => {
      throw new HTTPNotFound(`Article with id ${articleId} not found`);
    })
    .then((newsArticle) => {
      if (newsArticle.owner.toString() !== req.user._id) {
        throw new HTTPForbidden(
          `Deleting an article of another user is not allowed`
        );
      }

      newsArticle.deleteOne({ _id: articleId }).then((deleted) => {
        res.send({ data: deleted });
      });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new HTTPBadRequest(`Invalid Article Id: ${articleId}.`));
      } else {
        next(err);
      }
    });
};
