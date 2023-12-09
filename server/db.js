const { default: mongoose } = require("mongoose");
const key = process.env.SECRET_KEY;
const db = {
    connect: async () => {
        try {
            await mongoose.connect(key);
            console.log('CONNECTED!');

        } catch (err) {
            console.log('Mongodb connection error!!');
            console.log(err);
        }
    }
}

module.exports = {
    db
}