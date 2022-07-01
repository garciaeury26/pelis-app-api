const express = require("express")
require('dotenv').config();
const { request, response } = require("express");
const mongoConnection = require("./database/conection");
const userRouter = require("./routes/userRoutes");
const app = express();
const cors = require('cors')

const main = async () => {

    const port = process.env.PORT;

    app.use(cors());
    app.use(express.json());

    await mongoConnection();

    app.use("/api/user", userRouter);

    app.listen(port, () => {
        console.log("server running in port: ", port)
    })
}

main();