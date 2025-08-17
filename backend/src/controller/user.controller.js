import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.models.js";
import {UploadOncloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req,res)=>{
    const {fullname, email , username , password }= req.body
    console.log("email",email)
    console.log("req.files:", req.files);

    if(
        [fullname , email , username , password].some((field)=> field?.trim() === "")
    ){
        throw new ApiError(400 , "All the fields are required ")

    }
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });
    if (existedUser) {
        throw new ApiError(409, "User with email or username exist");
    }
    const Avatarpath = req.files?.avatar[0]?.path;
    const CoverImageLocalPath = req.files?.coverImage[0]?.path;
    console.log("Avatarpath:", Avatarpath);
    if (!Avatarpath || Avatarpath.trim() === "") {
        throw new ApiError(400, "Avatar image is required");
    }

    const avatar = await UploadOncloudinary(Avatarpath)
    const coverImage = await UploadOncloudinary(CoverImageLocalPath)

    if(!avatar){
        throw new ApiError(400, "Avatar image is required");
    }

    const user = await User.create({
        fullname,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()
    })

    const CreatedUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!CreatedUser){
        throw new ApiError(500 , "Error while registering the user")
    }
    return res.status(201).json({
        data: new ApiResponse(200, CreatedUser, "user registered successfully")
    })


})


export {registerUser}