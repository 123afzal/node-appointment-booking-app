const mongoose = require('mongoose');
const status = require('../constants/enums').appointmentStatus;
const statuses = [status.pending, status.accepted, status.rejected];

const appoitmentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },

    supplier_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },

    slot_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Slots'
    },

    status: {
        type: String,
        required: 'status is required',
        enum: statuses,
        default: status.pending
    }

}, { timestamps: true });

module.exports = mongoose.model('Appointments', appoitmentSchema);
