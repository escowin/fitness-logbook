const { Entry } = require("../models");

const entryData = [
  {
    entry_date: "2020.03.20",
    entry_weight: "190",
    entry_text: "text 1",
    user_id: 1,
    journal_id: 1
  },
  {
    entry_date: "2020.03.21",
    entry_weight: "190",
    entry_text: "text 2",
    user_id: 1,
    journal_id: 1
  },
  {
    entry_date: "2020.03.22",
    entry_weight: "190",
    entry_text: "text 3",
    user_id: 1,
    journal_id: 1
  },
  {
    entry_date: "2020.03.22",
    entry_weight: "190",
    entry_text: "text 3",
    user_id: 1,
    journal_id: 1
  },
  {
    entry_date: "2020.04.01",
    entry_weight: "190",
    entry_text: "kayaked to red bud & leg day. midsection tightening",
    user_id: 1,
    journal_id: 1
  },
  {
    entry_date: "2020.04.02",
    entry_weight: "190",
    entry_text: "v line coming through",
    user_id: 1,
    journal_id: 1
  },
  {
    entry_date: "2020.04.03",
    entry_weight: "190",
    entry_text: "v line coming through",
    user_id: 1,
    journal_id: 1
  },
  {
    entry_date: "2020.04.04",
    entry_weight: "190.4",
    entry_text: "been getting hungrier lately. dialing that in",
    user_id: 1,
    journal_id: 1
  },
];

const seedEntries = () => Entry.bulkCreate(entryData);

module.exports = seedEntries;
