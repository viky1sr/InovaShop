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
            message: "Success Register",
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            }
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
            message: "Success Login",
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            }
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
            createdAt: user.createdAt,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
});

// @desc    UPDATE user profile
// @route   PUT/PATCH /api/users/profile
// @access  Private
const updateUserProfile = expressAsyncHandler(async (req, res) => {
    const user = await UserDB.findById(req.user._id)

    if (user) {
       user.name = req.body.name || user.name
       user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password
            if (req.body.password !== req.body.confirm_password) {
                res.status(400)
                throw new Error('Password do not match')
            }
        }

        const updateUser = await user.save();

        res.json({
            message: "Success Update User",
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
            token: generateToken(updateUser._id)
        });

    } else {
        res.status(404)
        throw new Error('User not found')
    }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private / Admin
const getUser = expressAsyncHandler(async (req, res) => {
    const users = await UserDB.find({})
    res.send(users)
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = expressAsyncHandler(async (req, res) => {
    const user = await UserDB.findById(req.params.id).select('-password')

    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Delete user
// @route   DELETE /api/users/profile
// @access  Private / Admin
const deleteUser = expressAsyncHandler(async (req, res) => {
    const user = await UserDB.findById(req.params.id)

    if(user) {
        await user.remove()
        res.status(200).json({
            message: "User has been removed"
        })
    } else {
        res.status(401)
        throw new Error(`User not found`)
    }
});

const updateUser = expressAsyncHandler(async (req, res) => {
    const user = await UserDB.findById(req.params.id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
});



export {
    register,
    login,
    getUserProfile,
    updateUserProfile,
    getUser,
    getUserById,
    deleteUser,
    updateUser
}