import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer";

const foodRoter=express.Router();

// image storage Engine

const storage =multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cd)=>{
return cd(null,`${Date.now()} ${file.originalname}`)
    }
})

const upload=multer({storage:storage})

foodRoter.post("/add",upload.single("image"),addFood)
foodRoter.get("/list",listFood)
foodRoter.post("/remove",removeFood)


export default foodRoter
