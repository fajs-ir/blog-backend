const express = require("express"),
    router = express.Router(),
    controllers = require("../../../../controllers"),
    validator = require("../../../../validators");

router.post(
    "/login",
    validator("login"),
    controllers.v1.auth.login
);

// validate code
router.post(
    "/verify",
    validator("verify"),
    controllers.v1.auth.verify
);


router.post(
    "/register",
    validator("register"),
    controllers.v1.auth.register
);


module.exports = router;