import mongoose from 'mongoose'; 
import { randomUUID } from 'crypto';
import bcrypt from 'bcryptjs';
import gravatar from 'gravatar'; 
import { Role, Subscription } from '../lib/constants';
const { Schema, model } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        default: 'Guest',
        },
    email: {
        type: String,
        required: [true, 'Set email for user'],
        unique: true, 
        validate(value) {
            const re = /\S+@\S+\.\S+/;
            return re.test(String(value).trim().toLowerCase());
        }
        },
    password: {
        type: String,
        required: [true, 'Set password for user'],
    },
    subscription: {
        type: String,
        default: Subscription.START,
        required: [true, 'Set subscription for user'],
    },
    role: { 
        type: String,
        enum: {
            values: Object.values(Role), 
            message: 'Role is not allowed' 
        },
        default: Role.USER,
    },
    token: {
        type: String,
        default: null,
    },
    avatar: {
        type: String,
        default: function () {
            return gravatar.url(this.email, { s: '240' }, true);  
        },
    },
    avatarCloudId: {  
        type: String,
        default: null
    },
    isVerify: {
        type: Boolean,
        default: false
    },
    verifyTokenEmail: {
        type: String,
        default: randomUUID(),
    },
},
{
    versionKey: false,
    timestamps: true,
    toObject: { virtuals: true }
}
); 

userSchema.pre('save', async function (next) { 
    if (this.isModified('password')) {  
        const salt = await bcrypt.genSalt(6); 
        this.password = await bcrypt.hash(this.password, salt); 
    };
    next();
}); 

userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password); 
}

const User = model('user', userSchema); 

export default User;