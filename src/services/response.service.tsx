const buildSuccess = (_message:any, _data = null) => {
    return {
        status: "success",
        message: _message,
        data: _data,
    };
};

const buildFailure = (_message:any, _data = null) => {
    return {
        status: "failure",
        message: _message,
        data: _data,
    };
};

export {
    buildSuccess,
    buildFailure,
};
