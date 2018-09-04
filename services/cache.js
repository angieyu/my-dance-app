const mongoose = require('mongoose')
const redis = require('redis')
const util = require('util')

const redisUrl = 'redis://127.0.0.1:6379'
const client = redis.createClient(redisUrl)

// We change the behavior of client.get to return a promise,
// thus we do not need to use a callback
client.get = util.promisify(client.get)

// Store a reference to the original mongoose exec function
const exec = mongoose.Query.prototype.exec

// Create a cache function. Adding it to the prototype will make it available everywhere
mongoose.Query.prototype.cache = function () {
    this.useCache = true
    // With 'return this', the function is now chainable
    return this
}

// Here, we are monkey patching a library to run what we want. We modify the built in exec function
// As a note, we do not use an arrow function because it messes around with the value of 'this'
// 'this' always refers to the query instance
mongoose.Query.prototype.exec = async function () {
    if (!this.useCache) {
        exec.apply(this, arguments)
    }
    // We create a copy of this.getQuery() and add the values of this.mongooseCollection.name
    // this way, we do not mutate the stuff inside this.getQuery()
    // We take the results of this.getQuery() and add them to the empty object
    // Then take the property collection and add that to the object as well
    const key = JSON.stringify(
      Object.assign({}, this.getQuery(), {
          collection: this.mongooseCollection.name
      })
    )

    // Do we have any cached data in Redis corresponding to the key?
    const cacheValue = await client.get(key)

    // If we do, return that
    if (cacheValue) {
        // Create a new instance of the reference to the model that represents the query
        // Pass our values to that model
        const doc = JSON.parse(cacheValue)

        // If is an object, it is a plain object that is a reference to the model that represents the query
        // If it is an array, then we are going to iterate through and apply new this.model(doc) on each
        return Array.isArray(doc) ? doc.map(d => new this.model(d)) : new this.model(doc)
    }

    // Otherwise, issue the query and store the results in Redis
    const result = await exec.apply(this, arguments)

    client.set(key, JSON.stringify(result))

    return result
}
