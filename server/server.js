import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
import connectDB from "./config/db.js"
import "./config/instrument.js"
import * as Sentry from "@sentry/node"
import { clerkWebhooks } from "./controller/Webhooks.js"
import companyRoutes from "./routes/companyRoutes.js"
import connectCloudinary from "./config/cloudinary.js"
import jobRoutes from "./routes/jobroutes.js"
import {clerkMiddleware } from "@clerk/express";
import userRoutes from "./routes/userRoutes.js"

// initialize Express
const app = express()

//connect to database 
await connectDB()
await connectCloudinary()

// Middlewares 
app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())


//Routes
app.get("/" ,(req,res) => res.send("API Working"))
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
app.post("/webhooks",clerkWebhooks);
app.use("/api/company",companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/users", userRoutes);


//PORT

const PORT = process.env.PORT || 5000

Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)})


