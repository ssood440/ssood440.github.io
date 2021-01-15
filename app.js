const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const passport = require('passport');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

///////////////////////////////////////////////////////////// Database Work //////////////////////////////////////////////////////////////////////////////////


mongoose.connect("mongodb+srv://admin_shivam:Test123@cluster0.h5bdc.mongodb.net/TEST",{useNewUrlParser:true});


const usersData = {
    email : String,
    password : String
}

const user = mongoose.model("user" , usersData);




app.get("/",function(req,res){

    res.sendFile(__dirname + "/register.html");
    
});

app.get("/login",function(req,res){

    res.sendFile(__dirname + "/login.html");
});


app.post("/",function(req , res){

bcrypt.hash(req.body.pass , saltRounds , function(err ,hash){

    const person = new user({
        email: req.body.uname,
        password : hash
    });
    person.save(function(err){
        if(err){
            console.log(err);
        } else {
            res.sendFile(__dirname + '/registerdone.html');
        }
    });
}); 

});

app.post('/login',function(req ,res){

    const username = req.body.uname;
    const password = req.body.pass;

    user.findOne({email : username} , function (err , foundUser){

        if(err)
        {
            console.log(err);
        } 
        else 
        {
            if(foundUser)
            {
                bcrypt.compare(password , foundUser.password , function(err , result){

                    if ( result === true) {
                        
                        res.sendFile(__dirname + '/secret.html');

                    }
                });
                    
            }
        }
    });
});

app.post('/process' , function(req ,res){

    let data = '';

    if(req.xhr){
        data += 'hello,';
    }

    if(req.body.fieldB){
        data += '!';
    }
});








app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running");
})