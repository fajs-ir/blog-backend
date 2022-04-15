const sendResponse = (res, statusCode = 200, data, pagination) => {
    return res.status(statusCode).json({
        data,
        pagination
    });
}

module.exports = sendResponse;