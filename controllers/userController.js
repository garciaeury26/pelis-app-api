const { request, response, json } = require("express")
const User = require("../models/userModel")

const getLikeMovies = async (req = request, res = response) => {
    const { email } = req.params;

    try {
        const user = await User.findOne({ email });
        console.log(user)
        if (user) {
            return res.json({
                msg: "succes",
                movies: user.likedMovies
            })
        } else {
            return res.json({
                msg: "user with email given not found"
            })
        }
    } catch (error) {
        console.log(error);
        return res.json({
            msg: "error fetching movies"
        })
    }
}


const addTolikeMovies = async (req = request, res = response) => {
    const { email, data } = req.body
    console.log("add")
    try {
        const user = await User.findOne({ email });
        if (user) {
            const { likedMovies } = user;
            const moviewAlreadyLiked = likedMovies.find(({ id }) => id === data.id);
            if (!moviewAlreadyLiked) {
                await User.findOneAndUpdate(
                    user._id,
                    {
                        likedMovies: [...likedMovies, data]
                    },
                    { new: true }
                )
            } else {
                return res.json({ msg: "moview already added to the like list" });
            }
        } else {
            await User.create({ email, likeMovies: [data] });
        }

        return res.json({ msg: "Movie successfully added to liked list." });

    } catch (error) {
        console.log(error);
        return res.json({ msg: "Error adding movie to the liked list" });
    }
}


const removeFromLikeMovies = async (req = request, res = response) => {
    console.log("remove")
    try {
        const { email, movieId } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            const movies = user.likedMovies;
            const movieIndex = movies.findIndex(({ id }) => id === movieId);
            if (!movieIndex) {
                res.status(400).send({ msg: "Movie not found." });
            }
            movies.splice(movieIndex, 1);
            await User.findByIdAndUpdate(
                user._id,
                {
                    likedMovies: movies,
                },
                { new: true }
            );
            return res.json({ msg: "Movie successfully removed.", movies });
        } else return res.json({ msg: "User with given email not found." });
    } catch (error) {
        return res.json({ msg: "Error removing movie to the liked list" });
    }
}

module.exports = {
    getLikeMovies,
    addTolikeMovies,
    removeFromLikeMovies
}