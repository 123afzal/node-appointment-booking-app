const slotRepository = require('../repositories/slot.repository');
const messages = require('../utils/server.messages');


const slotService = {};

slotService.insertSlot = async (options) => {
    await slotRepository.saveNewSlot(options);
    return {
        response: messages.SUCCESSFUL_INSERTED,
    };
};

module.exports = slotService;
