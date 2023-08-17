//require library
const mongoose = require('mongoose');

//connect to database
async function main() {
    const db = await mongoose.connect('mongodb+srv://pankaj3112:ftHLwuuPqJvyE9Qj@cluster0.lm6iyo2.mongodb.net/?retryWrites=true&w=majority');
    module.exports = db;
}

main()
.then(() => console.log('Connected to MongoDB...')) //if connected
.catch(err => console.log(err)); //if error
