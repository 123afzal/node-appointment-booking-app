const slotService = require('../services/slot.service');
const userService = require('../services/user.service');
const serverResponse = require('../utils/server.responses');
const messages = require('../utils/server.messages');

// @route POST api/user/insertSlot
// @desc Add supplier slot
// @access Public
exports.insertSlot = async (req, res) => {
    const result = await slotService.insertSlot(req.body);
    if (result.response.code === 200) {
        return serverResponse.sendSuccess(res, result.response)
    }
};

// @route POST api/user/insertSlot
// @desc Add supplier slot
// @access Public
exports.availableSupplierSlots = async (req, res) => {
    const { supplier_id } = req.params;
    const result = await userService.availableSupplierSlots(supplier_id);
    return serverResponse.sendSuccess(res, result.response, result.suppliers)
};

// @route POST api/user/appointment
// @desc Add user appointment
// @access Public
exports.bookAppointment = async (req, res) => {
    const data = req.body;
    data.user_id = req.user._id;
    const result = await userService.bookAppointment(data);
    if (result.response.code === 200) {
        return serverResponse.sendSuccess(res, result.response)
    } else {
        return serverResponse.sendError(res, result.response)
    }
};

// @route PUT api/user/appointment
// @desc UPDATE user appointment
// @access Public
exports.updateAppointment = async (req, res) => {
    const data = req.body;
    data.supplier_id = req.user._id;
    const result = await userService.updateAppointment(data);
    if (result.response.code === 200) {
        return serverResponse.sendSuccess(res, result.response)
    } else {
        return serverResponse.sendError(res, result.response)
    }
};
