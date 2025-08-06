import { Webhook } from "svix"
import User from "../Models/User.js";
import dotenv from "dotenv";
dotenv.config();


// Api controller function to manage clerk user with mongoDB

export const clerkWebhooks = async (req,res) => {
  try {
    
    //create a svix instance with clerk webhook secret 
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    //verifing Headers 
    await whook.verify(JSON.stringify(req.body),{
        "svix-id": req.headers["svix-id"],
        "svix-timestamp": req.headers["svix-timestamp"],
        "svix-signature": req.headers["svix-signature"],
    });

    // getting data from req body
    const {data, type} = req.body;

    // switch case for diffent events

    switch (type) {
      case "user.created": {
      
        const userData = {
          _id: data.id,
          name: data.first_name+ ""+ data.last_name,
          email: data.email_addresses[0].email_address,
          resume: "",
          image: data.image_url,
        }
        await User.create(userData);
        res.JSON({})
        break;
      }
      case "user.updated": {

        const userData = {
          name: data.first_name+ ""+ data.last_name,
          email: data.email_addresses[0].email_address,
          image: data.image_url,
        }
        await User.findByIdAndUpdate(data.id, userData)
        res.JSON({})
        break;
      }
      case "user.deleted": {
       await User.findByIdAndDelete(data.id);
       res.JSON({});
       break;        
      }
      default: 
      break;
    }

  } catch (error) {
    console.log(error.message);
    res.JSON({success:false,message:"webhooks error"})    
  }
}