const mongoose = require("mongoose");

const mongoConnection = async () => {

    try {
        console.log("Mongose connection espere...")
        await mongoose.connect(process.env.MONGODB_CLUSTER, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("mongose connected");
    } catch (error) {
        console.log(error);
        throw new Error('Ha ocurrido un eror en la base de datos');
    }
}

module.exports = mongoConnection;