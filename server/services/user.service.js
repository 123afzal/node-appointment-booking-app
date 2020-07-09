const userRepository = require('../repositories/user.repository');
const slotRepository = require('../repositories/slot.repository');
const appointmentRepository = require('../repositories/appointment.repository');
const messages = require('../utils/server.messages');
const enums = require('../constants/enums');
const ObjectId = require('mongoose').Types.ObjectId;

const userService = {};

userService.findOne = async (options) => {
    return await userRepository.findOne(options)
};

userService.find = async (options) => {
    return await userRepository.find(options)
};

userService.availableSupplierSlots = async (supplierId) => {
    const options = {user_id: new ObjectId(supplierId), status:enums.slotStatus.available};
    const projection = {user_id:0, date:0};
    let suppliers = await slotRepository.find(options, projection);
    return {
        response: messages.SUCCESSFUL,
        suppliers
    }
};

userService.bookAppointment = async (data) => {
    //first we check free slot and existence of supplier
    const [slot, supplier] = await Promise.all([
        slotRepository.findOne({ _id: data.slot_id, status: enums.slotStatus.available }),
        userRepository.findOne({ _id: data.supplier_id })
    ]);

    if(!slot) {
        return {
            response: messages.SLOT_NOT_EXIST
        }
    }

    if(!supplier) {
        return {
            response: messages.SELLER_NOT_EXIST
        }
    }

    await appointmentRepository.saveNewAppointment(data);
    await slotRepository.findByIdAndUpdate(slot._id, { status: enums.slotStatus.pending });

    return {
        response: messages.APPOINTMENT_CREATED
    }
};

userService.updateAppointment = async (data) => {
    let statuses = [enums.appointmentStatus.rejected, enums.appointmentStatus.accepted];

    // first check status match with DB statuses
    if(!statuses.includes(data.status))
        return {response: messages.STATUS_NOT_EXIST};


    const _appointment = await appointmentRepository.findOne({ _id: data.id,
        status: enums.slotStatus.pending,
        supplier_id: data.supplier_id
    });

    // check if appointment not exist
    if (!_appointment)
        return {response: messages.APPOINTMENT_NOT_EXIST};

    await appointmentRepository.findByIdAndUpdate(_appointment._id, { status: data.status });
    await slotRepository.findByIdAndUpdate(_appointment.slot_id, {
        status: data.status === enums.appointmentStatus.accepted ? enums.slotStatus.booked : enums.slotStatus.available
    });

    return {
        response: messages.APPOINTMENT_UPDATED
    }
};



module.exports = userService;
