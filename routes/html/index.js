const router = require("express").Router();
const withAuth = require("../../utils/auth");
const {
  homepageView,
  journalView,
  editJournalView,
  editEntryView,
  profileView,
  tagsView,
} = require("../../controllers/html-controllers");

// html endpoints
router.route("/").get(homepageView);
router.route("/journals/:id").get(withAuth, journalView);
router.route("/journals/edit/:id").get(withAuth, editJournalView);
router.route("/entries/edit/:id").get(withAuth, editEntryView);
router.route("/profile").get(withAuth, profileView);
router.route("/tags").get(withAuth, tagsView);

module.exports = router;
