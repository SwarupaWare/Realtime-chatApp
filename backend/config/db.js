const mongoose = require('mongoose');

const connectDB = async () => {
    try {
       const conn = await mongoose.connect("mongodb+srv://{username}:{password}@atlascluster.fakkuma.mongodb.net/?retryWrites=true&w=majority");
        console.log(`Connected to MongoDb ${conn.connection.host}`);
    }
    catch(err) {
        console.log("err");
        console.log(`Error ${err.message}`);
        process.exit();

    }

};


module.exports ={connectDB}
