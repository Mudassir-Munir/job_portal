const errorMiddleware = (err, req, res, next) => {
    // console.log(err);
    // res.status(500).send({
    //     success: false,
    //     message: "something went wrong",
    //     err
    // });
    const defaultErrors = {
        statusCode: 500,
        message: err
    };

    // missing feilds errors i.e error name is ValidatorError
    if (err.name === "ValidatorError") {
       // console.log("here");
        defaultErrors.statusCode = 400;
        defaultErrors.message = Object.values(err.errors)
        .map((item) => item.message)
        .join(',');
    }

    if (err.code && err.code === 11000) {
        defaultErrors.statusCode = 400;
        defaultErrors.message = `${Object.keys(err.keyValue)} feild has to be unique`;
    }
    res.status(defaultErrors.statusCode).send({message: defaultErrors.message});
};

export default errorMiddleware;