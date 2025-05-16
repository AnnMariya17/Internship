const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    /*email: {
        type: email,
        required: true
    },
    status: {
        type: email,
        required: true
    },*/

    message: {
        type:String,
        required: true
    }
});
        module.exports = mongoose.model('Project',contactSchema);