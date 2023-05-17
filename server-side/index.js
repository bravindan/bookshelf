// const express = require('express');
import express from 'express'
import mysql from 'mysql';
import cors from 'cors';
import Jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
const PORT = 5000;
const salt = 8

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
}));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'lucidtech',
    database: 'bookshelf',
})

db.connect((error)=>{
if(error) console.log(error)
console.log("connected successfully to bookshelf")
})

// user registration 
app.post('/register',(req, res)=>{
    
    const sqlCommand = 'INSERT INTO user(`name`,`email`,`password`) VALUES (?);'
     bcrypt.hash(req.body.password.toString(), salt, (error, hashedPassword)=>{
        if(error) return console.log(error);
        const values = [req.body.name, req.body.email, hashedPassword];

        db.query(sqlCommand, [values], (error, result)=>{
            if(error){
                console.log(error)
                res.send(error)
            }
            console.log(result)
            console.log("Registered")
            res.send( {Status: 'Registered'})
        });
     })

});

// user login API
app.post('/login', (req, res)=>{
    const sqlCommand = 'SELECT * FROM user WHERE email= ?';
    db.query(sqlCommand, [req.body.email], (err, rows)=>{
        if(err) return (err);
        if(rows.length > 0){
            // console.log(rows);
            bcrypt.compare(req.body.password.toString(),rows[0].password, (err, result)=>{
                if(err) return (err);
                if(result){
                    const name = rows[0].name;
                    const token = Jwt.sign({name},'login-secret',{expiresIn: 1800});
                    res.cookie('token', token)
                    return res.send({Status: 'OK'})
                }else{
                    return res.send({Error: 'Wrong password'});
                }
            });
        }else{
            return res.send({emailErr:'Email does not exist'})
        }
        
    })

})

const verifyUser =(req, res, next) => {
    const token = req.cookies.token;
    if (!token){
        return res.send({authError: 'Your not authorized'})
    }else{
        Jwt.verify(token, 'login-secret', (err, decodedResult) => {
            if (err) {
                return res.send('invalidtoken')
            }else{
                req.name= decodedResult.name;
                next();
            }

        })
    }
}

app.get('/', verifyUser, (req, res) => {
    return res.json({Status: 'OK', name: req.name});
})

app.get('/logout',(req, res) =>{
    res.clearCookie('token');
    return res.json({Status: 'OK'});
})

// starting server
app.listen(PORT || 8000, (error)=> {
    if(error){
        console.log(error);
    };
    console.log('Running on http://localhost:' + PORT);

})