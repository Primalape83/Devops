const router = require('express').Router();

router.get('/', (req, res) => {

    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });

    return res.status(200).json({
        msg: "Logged Out Successfully"
    });

});

module.exports = router;