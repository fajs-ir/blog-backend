const express = require("express"),
    router = express.Router(),
    jwtCheker = require("../../../../middleware/auth");

router.use(
    "/auth",
    require("./auth")
);

router.use(
    "/user",
    jwtCheker,
    require("./user")
);

module.exports = router;
