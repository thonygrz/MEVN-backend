import mongoose,{Schema} from 'mongoose'

const userSchema = new Schema({
    role: {type: String, maxlength: 30, required: true},
    name: {type: String, maxlength: 50, unique: true, required: true},
    documentType: {type: String, maxlength: 20},
    documentNumber: {type: String, maxlength: 20},
    address: {type: String, maxlength: 70},
    phoneNumber: {type: String, maxlength: 20},
    email: {type: String, maxlength: 50, unique: true, required: true},
    password: {type: String, maxlength: 64, required: true},
    status: {type: Number, default: 1},
    createdAt: {type: Date, default: Date.now}
})

const User = new mongoose.model('user',userSchema)

export default User