//  Atahan#3445 - https://discord.gg/oot3

const mongoose = require('mongoose');

async function connect(){
    try{
        await mongoose.connect(process.env.mongodb, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log("Connected to the database!")
    }catch (e) {
        console.log(e)
    }
};

connect();

//  Atahan#3445 - https://discord.gg/oot3