
//import express from "express";
//import { chatWithBot } from "../controllers/chatbotController.js";

//const router = express.Router();

//router.get("/", (req, res) => {
  //res.send("👑 Kshetra Chatbot API is running");
//});

//router.post("/", chatWithBot);

//export default router;   

import express from "express";
import { chatWithBot } from "../controllers/chatbotController.js";


const router = express.Router();

router.get("/", (req, res) => {
  res.send("👑 Kshetra Chatbot API is running");
});

router.post("/", chatWithBot);

export default router;