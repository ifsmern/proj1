//connect to mongo via mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017',
{
    dbName: 'kmit',
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => err ? console.log(err) : console.log('Connected to kmit db '));


//schema for users
const UserSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    }
});

//setting the model using the schema
const Users = mongoose.model('users',UserSchema);
Users.createIndexes();

//for backend and express
const express = require('express');
const app = express();
const cors = require('cors');
const { response } = require('express');
console.log(" App is listening at port 5000");

app.use(express.json());
app.use(cors());
app.get("/",(req,res) => {
    res.send("App is working");
});

app.post("/adduser", async ( req,res) => {
    try{
        const user = new Users(req.body);
        console.log(user)
        let result = await user.save();
        result = result.toObject();
        if(result){
            res.send(req.body);
            console.log(result);
        }
        else{
            console.log("could not store user as user already exists?");            
        }
    }
    catch(e){
        response.send("Something went wrong");
        console.log(" exceptio!!")
    }
});
app.listen(5000);

