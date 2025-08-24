import jwt from 'jsonwebtoken';
import Company from "../Models/company.js";
import dotenv from "dotenv";
dotenv.config();

export const protectCompany = async (req, res, next) => {

    const token = req.headers.token;

    if(!token) {
        return res.status(401).json({ success: false, message: "Not authorized, login again" });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.company = await Company.findById(decoded.id).select("-password");
        
        next();
        
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}
