import mongoose,{Schema} from 'mongoose'

const personSchema = new Schema({
    personType: {type: String, maxlength: 20, required: true},
    name: {type: String, maxlength: 50, unique: true, required: true},
    documentType: {type: String, maxlength: 20},
    documentNumber: {type: String, maxlength: 20},
    address: {type: String, maxlength: 70},
    phoneNumber: {type: String, maxlength: 20},
    email: {type: String, maxlength: 50, unique: true},
    status: {type: Number, default: 1},
    createdAt: {type: Date, default: Date.now}
})

const Person = new mongoose.model('person',personSchema)

export default Person