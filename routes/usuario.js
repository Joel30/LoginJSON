const express = require('express');
const autenticacion = require('./checkAuth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();
const USER = require('../database/models/usuario');

router.get('/', autenticacion, async(req,res,next)=>{
    let result = await USER.find({});
    res.status(200).json(result);
});

router.post('/', (req,res,next)=>{
    var datos = req.body;

    datos["fechaRegistro"] = new Date();
    bcrypt.hash(req.body.password,10, async(err,hash)=>{
        if(hash){
            datos["password"] = hash;
            var usuario = new USER(datos);
            let result = await usuario.save();
            res.status(200).json(result);
        }else{
            res.status(500).json({
                message:err
            });
        }
    });
});

router.post('/login', async(req,res,next)=>{
    let user = await USER.find({email:req.body.email});
    if(user.length>0){
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(result){
                const token=jwt.sign({
                    email:user[0].email,
                    id:user[0]._id
                }, process.env.JWT_KEY || "password",{expiresIn:"1h"});
                res.status(200).json({
                    message:"Autenticación exitosa",
                    token:token
                });
            }else{
                res.status(401).json({message:"Password incorrecto"});
            }
        });
    }else{
        res.status(401).json({message:"Email incorrecto"});
    }
});

module.exports=router;
