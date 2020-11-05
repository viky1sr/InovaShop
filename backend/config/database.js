import mongoose from 'mongoose';
import color from 'colors'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    } catch (e) {
        console.log(`Error connecting to MongoDB: ${e.message}`.red.underline);
        process.exit(1);
    }
}

export default connectDB;