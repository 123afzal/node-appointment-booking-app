const mongoose = require('mongoose');const status = require('../constants/enums').slotStatus;
const statuses = [status.available, status.booked, status.pending];

const SlotSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },

    from: {
        type: String,
        required: true
    },

    to: {
        type: String,
        required: true
    },

    status: {
        type: String,
        required: 'status is required',
        enum: statuses,
        default: status.available
    },

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
});

module.exports = mongoose.model('Slots', SlotSchema);
