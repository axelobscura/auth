module.exports = function (app) {
    app.get("/", (req, res, next) => {
        res.send(['water', 'earth', 'fire', 'wind'])
    })
}