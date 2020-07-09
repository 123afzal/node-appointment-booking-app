const Appointment = require('../models/appointment.model');

const appointmentsRepository = {};

appointmentsRepository.find = async (options, projection = {}) => {
    return await Appointment.find(options, projection);
};

appointmentsRepository.findOne = async (options) => {
    return Appointment.findOne(options);
};

appointmentsRepository.findByIdAndUpdate = async(id, data) => {
    return Appointment.findByIdAndUpdate(id, data);
};

appointmentsRepository.saveNewAppointment  = async (appointment) => {
    const newAppointment = new Appointment(appointment);
    return await newAppointment.save();
};

module.exports = appointmentsRepository;
