const Slot = require('../models/slot.model');

const slotsRepository = {};

slotsRepository.find = async (options, projection = {}) => {
    return await Slot.find(options, projection);
};

slotsRepository.findOne = async (options) => {
    return Slot.findOne(options);
};

slotsRepository.findByIdAndUpdate = async(id, data) => {
    return Slot.findByIdAndUpdate(id, data);
};

slotsRepository.saveNewSlot  = async (slot) => {
    const newSlot = new Slot(slot);
    return await newSlot.save();
};

module.exports = slotsRepository;
