import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import validate from 'mongoose-validator';

let nameValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 50],
        message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
    }),
    // validate({
    //     validator: 'isAlphanumeric',
    //     passIfEmpty: true,
    //     message: 'Name should contain alpha-numeric characters only',
    // }),
]

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            validate:nameValidator
        },
        email: {
            type: String,
            required: [true,'Please add a email'],
            unique: [true, 'Email has already been taken'],
            match: [
                // eslint-disable-next-line no-useless-escape
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'Please add a valid email'
            ]
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            // if u want seeder data please comment this match
            match: [
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&-.])[0-9a-zA-Z@$!%*#?&]{8,}$/, 'Your password is so weak'
            ],
            select: false
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema);

export default User