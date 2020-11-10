import expressAsyncHandler from 'express-async-handler';
import ErrorResponse from '../Middleware/errorResponse.js';
import UserDB from '../Models/User.js';


export const register = expressAsyncHandler(async (req,res,next) => {
    const { name, email, role, password, confirm_password } = req.body;

    //Check Password
    if (password !== confirm_password) {
        return res.status(400).json({
            success: 400,
            messages: "Password not match"
        });
    }


    let user = await UserDB.findOne({ email });
    //or
    //let user = await User.findOne({ name });

    if (user) return res.status(400).send("User already registered.");

    user = new UserDB({ name, email, password ,role });

    user = await user.save();

    const token = sendTokenResponse(user, 200 ,res)

    res.status(200).json({
        success:true,
        messages: "Register Success",
        token
    });
});

export const login = expressAsyncHandler(async (req,res,next) => {
    const {email,password} = req.body;
    if (!email || !password) {
        return next(new ErrorResponse('Please provide email and password',401))
    }

    let user = await UserDB.findOne({  email }).select('+password');
    if (!user) {
        return next(new ErrorResponse('Incorect login info',401))
    }

    let isMatch = await user.matchPassword(password)
    if (!isMatch) {
        return next(new ErrorResponse('Incorect login info',401))
    }

    //save token in cookie
    const token = sendTokenResponse(user, 200 ,res)

    res.status(200).json({
        success:true,
        messages: "Login Berhasil bose",
        token: token
    });
});

export const sendTokenResponse = (user, statusCode, res) => {
    //Create token
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + process.env.JWT_EXPIRE_COOKIE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    if (process.env.NODE_ENV === 'development') {
        options.secure = true
    }

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            _id: user._id,
            message: `Login success on email ${user.email}`,
            token: `Bearer ${token}`,
            status: true,
        });
}

export const getUserProfile = expressAsyncHandler( async (req, res) => {
    const user = await UserDB.findById(req.user._id)
    console.log(user._id);

    if(user) {
        res.json({
            message: `sukses login`,
            user: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(404)
        throw new Error(`User not found`)
    }
});
