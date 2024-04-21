const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticator } = require("../middlewares/authenticator");
const { NoteModel } = require("../models/NoteModel");

const noteRouter = express.Router();
noteRouter.use(authenticator)

//To get all the notes stored in the database by a particular user

noteRouter.get("/", async(req,res)=>{
    let token = req.headers.authorization
    jwt.verify(token, "sachintha",async(err,decode)=>{
        try {
            let data = await NoteModel.find({user:decode.userId})
            res.send({
                data: data,
                message: "Success!!!",
                status:1
            })
        } catch (error) {
            res.send({
                message: error.message,
                status:0
            })
        }
    })
    
})


// To create a new note and save it in the database
noteRouter.post("/create", async (req, res) => {

    try {
        let note = new NoteModel(req.body)
        await note.save()
        res.send({
            message: "Note is created successfully!!!",
            status: 1
        })
    } catch (error) {
        res.send({
            message: error.message,
            status: 0
        })
    }

})

//To update the existing note in the database
noteRouter.patch("/",async(req,res)=>{
    let {id} = req.headers
    try {
        await NoteModel.findByIdAndUpdate({_id:id},req.body)
        res.send({
            message: "Note has been updated successfully!!!",
            status:1
        })
    } catch (error) {
        res.send({
            message: error.message,
            status:0
        })
    }
})


//To delete an existing note in the database
noteRouter.delete("/",async(req,res)=>{
    let {id} = req.headers
    try {
        await NoteModel.findByIdAndDelete({_id:id})
        res.send({
            message: "Note has been deleted successfully!!!",
            status:1
        })
    } catch (error) {
        res.send({
            message: error.message,
            status:0
        })
    }
})

module.exports = {
    noteRouter,
};
