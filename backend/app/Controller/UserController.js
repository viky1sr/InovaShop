import expressAsyncHandler from "express-async-handler";
import UserDB from '../Models/User.js';
import generateToken from "../../utils/generateToken.js";

const register = expressAsyncHandler(async (req, res) => {
   const { email, name, password, confirm_password } = req.body

    //Check Password
    if (password !== confirm_password) {
        res.status(400)
        throw new Error('Password do not match')
    }

    const userExists = await UserDB.findOne({ email });
    if ( userExists ) {
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await UserDB.create({
       name,
       email,
       password
    });

    if(user) {
        res.status(200).json({
            "message": "Success Register",
            data : {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            },
        });
    } else {
        res.status(400)
        throw new Error(`Invalid user data`)
    }

});

// @desc    Login user & get token
// @route   POST /api/users/login
// @access  Public
const login = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await UserDB.findOne({ email }).select('+password');

    if ( user && (await user.matchPassword(password)) ) {
        res.json({
            "message": "Success Login",
            data : {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            },
        });
    } else {
        res.status(401)
        throw new Error(`Invalid email or password`)
    }

});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = expressAsyncHandler(async (req, res) => {
    const user = await UserDB.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
});

export {
    register,
    login,
    getUserProfile

}