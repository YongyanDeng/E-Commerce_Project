const jwt = require("jsonwebtoken");

exports.loginVerify = async function (req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (decoded) return next();
        else
            return next({
                status: 401,
                message: "Please sign in first!",
            });
    } catch (err) {
        return next(err);
    }
};

exports.userVerify = async function (req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (decoded && decoded.id === req.params.id) return next();
        else
            return next({
                status: 401,
                message: "Unauthorized",
            });
    } catch (err) {
        return next(err);
    }
};

exports.vendorVerify = async function (req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (decoded && decoded.category === "VENDOR") return next();
        else
            return next({
                status: 401,
                message: "You are not VENDOR! Unauthorized",
            });
    } catch (err) {
        return next(err);
    }
};
