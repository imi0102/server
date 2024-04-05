const ResponseModel = {
    success: (data = null, message = 'Success', status = 200) => {
        return {
            status:status,
            success: true,
            data: data,
            message: message
        };
    },
    error: (message = 'Error', status = 500) => {
        return {
            success: false,
            error: {
                message: message,
                status: status
            }
        };
    }
};

module.exports = ResponseModel;
