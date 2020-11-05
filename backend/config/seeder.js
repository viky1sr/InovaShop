import mongoose from 'mongoose';
import dotenv from 'dotenv';
import color from 'colors';
import Users from '../app/Models/User.js';
import Products from '../app/Models/Product.js';
import Orders from '../app/Models/Order.js';
import dataUsers from '../storage/users.js';
import dataProducts from '../storage/products.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const destroyData = async () => {
    try {
        await Users.deleteMany();
        await Products.deleteMany();
        await Orders.deleteMany();


        console.log('Data Destroyed!'.green.inverse);
       process.exit();
    } catch (e) {
        console.error(`${e}`.red.inverse);
        process.exit(1);
    }
}

const importData = async () => {
    try {
        await Users.deleteMany();
        await Products.deleteMany();
        await Orders.deleteMany();

        const createdUser = await Users.insertMany(dataUsers);

        const adminUser = createdUser[0]._id

        const samplesProducts = dataProducts.map( product => {
            return {...product, user: adminUser};
        });

        await Products.insertMany(samplesProducts)

        console.log('Data Imported!'.green.inverse);
        process.exit();
    } catch (e) {
        console.error(`${e}`.red.inverse);
        process.exit(1);
    }
}

if(process.argv[2] === '-i') {
    importData();
} else if(process.argv[2] === '-d') {
    destroyData();
}