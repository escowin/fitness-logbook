const router = require("express").Router();
const { Tag, Journal, Entry, EntryTag } = require("../models");
const withAuth = require("../utils/auth");

// packaged data for specified endpoints to render. each endpoint has a corresponding view file to display data.
// - data accessible to the homepage view
router.get("/", (req, res) => {
  Journal.findAll({
    attributes: [
      "id",
      "title",
      "description",
      "start_date",
      "end_date",
      "duration",
    ],
    order: [["created_at", "DESC"]],
    include: [
      {
        model: Entry,
        attributes: ["id", "entry_text", "journal_id", "user_id", "created_at"],
        order: [["entry_date", "DESC"]],
      },
    ],
  })
    .then((dbJournalData) => {
      // to display every post without issue
      const journals = dbJournalData.map((journal) =>
        journal.get({ plain: true })
      );
      res.render("homepage", {
        journals,
        loggedIn: req.session.loggedIn,
        customstyle: '<link rel="stylesheet" href="/css/homepage.css">',
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// - login template | note: using partial for login. login view may not be needed.
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login", {
    customstyle: '<link rel="stylesheet" href="/css/login.css">',
  });
});

// - data accessible to the single-journal view
router.get("/journals/:id", (req, res) => {
  Journal.findOne({
    where: { id: req.params.id },
    attributes: [
      "id",
      "title",
      "description",
      "start_date",
      "end_date",
      "duration",
    ],
    include: [
      {
        model: Entry,
        attributes: ["id", "entry_date", "entry_weight", "entry_text"],
        include: [
          {
            model: Tag,
            through: EntryTag,
            attributes: ["id", "tag_name"],
          },
        ],
        order: [["entry_date", "DESC"]],
      },
    ],
    order: [[Entry, "entry_date", "DESC"]],
  })
    .then((dbJournalData) => {
      if (!dbJournalData) {
        res.status(404).json({ message: "post not found" });
        return;
      }

      // serializes data
      const journal = dbJournalData.get({ plain: true });

      // passes data to template, loggedIn allows for conditional rendering within the template
      res.render("single-journal", {
        journal,
        loggedIn: req.session.loggedIn,
        customstyle: '<link rel="stylesheet" href="/css/single-journal.css">',
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// - data accessible to the edit-journal view
router.get("/journals/edit/:id", withAuth, (req, res) => {
  Journal.findOne({
    where: { id: req.params.id },
    attributes: [
      "id",
      "title",
      "description",
      "start_date",
      "end_date",
      "duration",
    ],
  })
    .then((dbJournalData) => {
      if (!dbJournalData) {
        console.log(err);
        res.status(404).json({ message: `journal #${id} not found` });
        return;
      }
      const journal = dbJournalData.get({ plain: true });
      res.render("edit-journal", {
        journal,
        loggedIn: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// - data accessible to the edit-entry view
router.get("/entries/edit/:id", withAuth, (req, res) => {
  Entry.findOne({
    where: { id: req.params.id },
    attributes: ["id", "entry_text", "entry_date", "entry_weight"],
    include: [
      {
        model: Tag,
        through: EntryTag,
        attributes: ["id", "tag_name"],
      },
    ],
  })
    .then((dbEntryData) => {
      if (!dbEntryData) {
        res.status(404).json({ message: "entry not found" });
        return;
      }
      const entry = dbEntryData.get({ plain: true });
      // renders edit-entry view when logged in
      res.render("edit-entry", {
        entry,
        loggedIn: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
