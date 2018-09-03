const mongoose = require('mongoose')
const { Schema } = mongoose

const combinationSchema = new Schema({
    title: String,
    proclivity: String,
    focus: String,
    createdAt: { type: Date, default: Date.now },
    _user: { type: Schema.Types.ObjectId, ref: 'User' }
})

mongoose.model('Combination', combinationSchema)
