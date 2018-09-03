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

    // Get all the combinations that are tied to the user
    app.get('/api/combinations', requireLogin, async (req, res) => {
        const redis = require('redis')

        const redisUrl = 'redis://127.0.0.1:6379'
        const client = redis.createClient(redisUrl)

        const util = require('util')
        // We change the behavior of client.get to return a promise,
        // thus we do not need to use a callback
        client.get = util.promisify(client.get)
        // Do we have any cached data in Redis related to this query?
        const cachedCombinations = await client.get(req.user.id)
        // If yes, then respond right away and return
        if (cachedCombinations) {
            console.log('SERVING FROM CACHE')
            return res.send(JSON.parse(cachedCombinations))
        }
        // If no, then we need to respond to request
        // Look in the Combinations collection and find all where the user is this user
        // and update our cache to store data
        const combinations = await Combination.find({ _user: req.user.id })
        console.log('SERVING FROM MONGODB')
        res.send(combinations)
        client.set(req.user.id, JSON.stringify(combinations))
    })

    // Post a new combinations
    app.post('/api/combinations', requireLogin, async (req, res) => {
        const { title, proclivity, focus } = req.body

        const combination = new Combination({
            title,
            proclivity,
            focus,
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
