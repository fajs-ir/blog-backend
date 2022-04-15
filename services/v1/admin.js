const models = require('../models'),
    bcrypt = require("bcrypt");

const initialize = async (req, res) => {
    const adminExists = await models.Admin.findOne();
    if (!adminExists) {
        await new models.Admin({
            name: "admin",
            email: process.env.ADMIN_EMAIL,
            password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 10),
            type: "superadmin"
        }).save();
    }
};

module.exports = {
    initialize
};