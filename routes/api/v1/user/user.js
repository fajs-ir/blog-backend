const express = require("express"),
    router = express.Router(),
    multer = require("multer"),
    {
        storage
    } = require('../../../../config/multerOptions'),
    upload = multer({
        storage: storage
    }),
    controllers = require("../../../../controllers"),
    validator = require("../../../../validators");

// update user detail
router.put(
    "/update",
    validator("user"),
    controllers.v1.user.update
);

router.put(
    "/avatar",
    upload.single("avatar"),
    jimp.avatar,
    controllers.v1.user.updateAvatar
);

router.delete(
    "/avatar",
    controllers.v1.user.deleteAvatar
);

router.get(
    "/",
    controllers.v1.user.getUser
);

router.put(
    "/deactive",
    controllers.v1.user.userDeactive
);

module.exports = router;