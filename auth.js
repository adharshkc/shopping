const fs = require('fs');
const { mongo } = require('mongoose');
const mongodb = require('/home/adharsh/projects/shoe site/mongo.js')

let login = false;

// checking a user is verified

function isAuth(email, pass){
    // console.log("no error in isAuth")
    login = true;
    return mongodb.getUser(email,pass)
}

// registering a user inside mongo 

function registerUser(data){
    // console.log("registered user")
    mongodb.registerUserMongoDb(data)
}

// getting shopping data

function getShoppingData(){
    data1 = require('/home/adharsh/projects/shoe site/data.json')
    data = data1.data;
    return data1.data
}

// accessing shopping page after login

function isUserLoggedIn(){
    // console.log("isUser")
    return login = true
}

module.exports = {isAuth, registerUser, getShoppingData, isUserLoggedIn}