const  mongoose = require('mongoose')
let Schema = mongoose.Schema


// created scheme in mongo
let schema = new Schema({
    "email" : String,
    "password" : String,
})

//initializing schema in mongo

let User;
function initialize(){
    // console.log("initialize is working");
    let db = mongoose.createConnection("mongodb+srv://adharsh:148118198@cluster0.cnkuq0n.mongodb.net/test")
    return new Promise((resolve, reject) => {
        db.on('err',(err)=>{
            console.log("err",err);
            reject()
        })
        db.once('open',()=>{
            User = db.model("users", schema)
            console.log("user schema created");
            resolve()
        })
    })
    
}

// registering user in mongo

function registerUserMongoDb(userData){
    // console.log(userData)
    initialize().then(()=>{
        let User1 = new User(userData)
        //console.log(User1)
        User1.save((err)=>{
            if(err)
            {console.log("The user is already present")}
            else if(err){
                console.log("error is creating user")
            }
        })
    
    })
  
}

// getting a new user in mongodb

function getUser(Email, password){
    // console.log("getuser is called");
    return new Promise((resolve, reject) => {
        
        initialize().then(()=>{
            
            User.find({email:Email}).exec().then((data)=>{

                console.log(data[0].password)
                // console.log("finding user");
                if(data[0].password == password){
                    resolve(true)
                    console.log("password is correct");
                }
            })
            .catch((err)=>{
                reject(err)
            })
        })
    })
}

// exporting functions

module.exports = {registerUserMongoDb, getUser}