import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    _id:{type:String, required:true},
    email:{type:String, required:true},
    full_name:{type:String, required:true},
    username:{type:String, unique:true},
    bio:{type:String, default:"Hey there!."},
    profile_picture:{type:String, default:""},
    cover_photo:{type:String, default:""},
    location:{type:String,default:""},
    
},{timestamps:true})

const User = mongoose.model("User", userSchema);

export default User;