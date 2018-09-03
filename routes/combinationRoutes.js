const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')

// We use the collection called "Combination'
const Combination = mongoose.model('Combination')

module.exports = app => {
    // Get a single combinations by id
    app.get('/api/combinations/:id', requireLogin, async (req, res) => {
        const combination = await Combination.findOne({
            _user: req.user.id,
            _id: req.params.id
        })

        res.send(combination)
    })

    // Get all the combinations by user
    app.get('/api/combinations', requireLogin, async (req, res) => {
        console.log("getting all combinations - in server")

        const combinations = await Combination.find({ _user: req.user.id })

        res.send(combinations)
    })

    // Post a new combinations
    app.post('/api/combinations', requireLogin, async (req, res) => {
        const { title, proclivity } = req.body

        const combination = new Combination({
            title,
            proclivity,
            _user: req.user.id
        })

        try {
            await combination.save()
            res.send(combination)
        } catch (err) {
            res.send(400, err)
        }
    })
}
