import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    stockId: {
        type: String
    },
},
    { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    return next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)// return is missing
}

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        {
            _id: this._id
        },
        process.env.JWT_SECERT_KEY);

    return token;
}


export const User = model('User', userSchema);