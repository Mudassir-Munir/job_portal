import mongoose from "mongoose";


const ConnectDb = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_LOCAL_URL);
        console.log(
            `Connected to mongo database ${mongoose.connection.host}`.bgMagenta.white
        );
    }
    catch (error){
        console.log(`MongoDb error ${error}`.bgRed.white);
    }
}

export default ConnectDb;