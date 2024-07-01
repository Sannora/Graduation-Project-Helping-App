const {Schema, model} = require('mongoose')

const postSchema = new Schema({
    title: {type: String, required: true},
    category: {type: String, enum: ["Academic", "Translation", "Software", "Mechanics", "Craftsmanship"],
        message: "{VALUE is not supported"},
    description: {type: String, required: true},
    author: {type: Schema.Types.ObjectId, ref: "User"},
}, {timestamps: true})

module.exports = model("Post", postSchema)