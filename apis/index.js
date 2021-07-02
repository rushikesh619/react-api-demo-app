const relationship = require("./relationship");

module.exports = (app) => {
    app.use("/api/relationship", relationship);
}