import mongoose from "mongoose"

const ConnectDatabase = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

export default ConnectDatabase;