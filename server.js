const express = require('express');
const hbs = require('hbs');
const path = require('path');
const bodyParser = require('body-parser');
// const mongo = require('/home/adharsh/projects/shoe site/mongo.js')
const auth = require('/home/adharsh/projects/shoe site/auth.js')


let app = express();
app.use(bodyParser.urlencoded({extended:false}));

//rendering home page

app.get("/", function(req, res){
    res.render(path.join(__dirname,"/templates/login.hbs"))
    // console.log("welcome to login page");
});

app.post("/", function(req, res){
    console.log("post of login");
    
    auth.isAuth(req.body.email, req.body.password).then((data)=>{
         console.log("user is authorised")
         res.redirect('/shopping')
    }).catch((err)=>{
        console.log("not authorised",err)
        res.render(path.join(__dirname,"/templates/error.hbs"))
    })
    console.log("after login");

})



//rendering register page
app.get("/register", function(req, res){
    res.render(path.join(__dirname,"templates/register.hbs"))
})

app.post('/register', function(req, res){
    auth.registerUser(req.body)
    res.redirect('/')
})

// rendering shopping page

app.get('/shopping', function(req, res){
    console.log("after login");
    if(auth.isUserLoggedIn == true){
        console.log("welcome to shopping page")
    data = auth.getShoppingData()
    res.render(path.join(__dirname,'/templates/shopping.hbs'),{data : data})
    }else{
        res.render(path.join(__dirname,'/templates/error.hbs'))
    }
})




console.log("server started");

app.listen(8000);