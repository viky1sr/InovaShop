import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: ['Please add your name', true],

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
        required: [true,'Please add a password'],
        minlength: 6,
        // match: [
        //     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&-.])[0-9a-zA-Z@$!%*#?&]{8,}$/, 'Your password is so weak'
        // ],
        select: false
    },
    isAdmin: {
        type: Boolean,
        required:  true,
        default: false
    },
},{
    timestamps: true,
});

const User = mongoose.model('User',userSchema);

export default User;