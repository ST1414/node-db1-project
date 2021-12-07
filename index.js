// 4.2.1 - RELATIONAL DATABASES (KNEX.JS) - Project
// Mon. Dec 6, 2021

const server = require("./api/server.js");

const PORT = process.env.PORT || 9000;

server.listen(PORT, () => {
  console.log(`\n== API running on port ${PORT} ==\n`);
});
