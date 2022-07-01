
const mongose = require("mongoose");

const userSchema = new mongose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        max: 30
    },
    likedMovies: Array
})

module.exports = mongose.model("users", userSchema);