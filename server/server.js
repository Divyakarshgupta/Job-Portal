import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
import connectDB from "./config/db.js"
import "./config/instrument.js"
import * as Sentry from "@sentry/node"
import { clerkWebhooks } from "./controller/Webhooks.js"
import ServerlessHttp from "serverless-http"

// initialize Express
const app = express()

//connect to database 
await connectDB()

// Middlewares 
app.use(cors())
app.use(express.json())

//Routes
app.get("/" ,(req,res) => res.send("API Working"))
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
app.post("/webhooks",clerkWebhooks);


//PORT

const PORT = process.env.PORT || 5000

Sentry.setupExpressErrorHandler(app);

// app.listen(PORT, () =>{
//     console.log(`Server running on port ${PORT}`)})

export const handler = ServerlessHttp(app);