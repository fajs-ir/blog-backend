const models = require('../../models'),
    redis = require('../../utils/redis'),
    bcrypt = require('bcrypt'),
    fa = require('../../helper/language/fa.json');


const update = async ({
    userId,
    body
}) => {
    const user = await models.User.findById(userId);

    if (body.username && body.username != user.username) {
        if (!await redis.usernameUpdates.canUpdate(userId)) {
            const error = new Error(fa.error.usernameUpdateLimit);
            error.status = 400;
            throw error;
        }
        body.username = body.username.toLowerCase().replace(/\s+/g, '').trim();
        const existedUser = await checkUsernameExists({
            username: body.username,
            exceptId: userId
        });
        if (existedUser) {
            const error = new Error(fa.error.usernameExists);
            error.status = 400;
            throw error;
        }
    }

    if (body.password) {
        if (!await bcrypt.compare(body.currentPassword, user.password)) {
            const error = new Error(fa.error.currentPasswordNotMatch);
            error.status = 400;
            throw error;
        }
        body.password = await bcrypt.hash(body.password, 10);
    }

    user.name = body.name || user.name;
    user.username = body.username || user.username;
    user.bio = body.bio || user.bio;
    user.notifications = {
        ...user.notifications,
        ...body.notifications
    };
    user.socialMedia = {
        ...user.socialMedia,
        ...body.socialMedia
    };
    user.password = body.password || user.password;

    await user.save();

    return {
        user: personalUser(user)
    };
};

const updateAvatar = async ({
    userId,
    body
}) => {
    const user = await models.User.findById(userId);
    user.avatar = {
        original: body.avatar.original,
        thumbnail: body.avatar.thumbnail
    };
    await user.save();
    return {
        user: personalUser(user)
    };
};

const deleteAvatar = async ({
    userId
}) => {
    const user = await models.User.findById(userId);
    user.avatar = {
        original: null,
        thumbnail: null
    }
    await user.save();
    return {
        user: personalUser(user)
    };
};


const me = async ({
    userId
}) => {
    const user = await models.User.findById(userId);
    return {
        user: personalUser(user)
    };
};

const deactive = async ({
    userId
}) => {
    const user = await models.User.findById(userId);
    user.status = 'deleted';
    await user.save();
    return {
        message: fa.success.success,
    };
};

const checkUsernameExists = async ({
    username,
    exceptId
}) => {
    username = username.toLowerCase().replace(/\s+/g, '').trim();

    const user = await models.User.findOne({
        username,
        _id: {
            $ne: exceptId
        }
    });

    return !!user;
};

const personalUser = (user) => {
    return {
        _id: user._id,
        name: user.name,
        username: user.username,
        usernameRemainingUpdates: redis.usernameUpdates.updateCount(user._id),
        email: user.email,
        bio: user.bio,
        avatar: user.avatar,
        socialMedia: user.socialMedia,
        notifications: user.notifications,
    }
};

module.exports = {
    update,
    updateAvatar,
    deleteAvatar,
    deactive,
    me,
}