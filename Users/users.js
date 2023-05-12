import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:String,
    email : String,
    password : String
});
export const users = mongoose.model('users', userSchema);
