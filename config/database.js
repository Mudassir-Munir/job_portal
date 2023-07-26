import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_LOCAL_URL);
        console.log(
            `Connected to mongo database ${mongoose.connection.host}`
        );
    } catch (error) {
        console.log(`MongoDb error ${error}`
        );
    }
};

export default connectDb;