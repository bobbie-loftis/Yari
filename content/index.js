const {
  CONTENT_ROOT,
  CONTENT_ARCHIVE_ROOT,
  VALID_LOCALES,
} = require("./constants");
const Document = require("./document");
const Redirect = require("./redirect");
const { buildURL, slugToFoldername } = require("./utils");

module.exports = {
  CONTENT_ROOT,
  CONTENT_ARCHIVE_ROOT,
  VALID_LOCALES,

  Document,
  Redirect,

  buildURL,
  slugToFoldername,
};
