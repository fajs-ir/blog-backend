const models = require('../../models'),
    {
        JWT_SECRET,
    } = require("../../config/secret"),
    {
        jwtExpireAfter,
        jwtRememberExpireAfter
    } = require("../../config/config"),
    redis = require("../../utils/redis"),
    jwt = require("jsonwebtoken"),
    fa = require("../../helper/language/fa.json"),
    bcrypt = require("bcrypt");

const verify = async ({
    email,
    code,
    userAgent
}) => {
    email = email.toLowerCase().replace(/\s+/g, '').trim();

    // TODO: check in redis if user is blocked

    // check code
    const digitTokenIsValid = await redis.digitToken.check(email, code);
    if (!digitTokenIsValid) {
        const error = new Error(fa.error.invalidToken);
        error.status = 401;
        throw error;
    }

    const user = await models.User.findOne({
        email
    });

    if (user.status == 'deleted' || user.status == 'register') {
        user.status = 'active';

        // TODO: update all posts and comments to active
    } 

    await user.save();

    // update last login
    await redis.lastLogins.add(user._id, userAgent);

    // generate a token with user id and secret
    const token = jwt.sign({
            _id: user._id,
            iss: "fajs",
            exp: jwtExpireAfter,
        },
        JWT_SECRET
    );

    return {
        token,
        user: personalUser(user)
    };
};

const login = async ({
    email,
    password,
    remember,
    userAgent
}) => {
    // TODO: Add recaptcha
    email = email.toLowerCase().replace(/\s+/g, '').trim();

    // TODO: check in redis if user is blocked

    const user = await models.User.findOne({
        email,
        status: {
            $ne: 'register'
        }
    });

    if (!user) {
        const error = new Error(fa.error.emailOrPasswordIncorrect);
        error.status = 401;
        throw error;
    }

    // check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        const error = new Error(fa.error.emailOrPasswordIncorrect);
        error.status = 401;
        throw error;
    }

    // update last login
    await redis.lastLogins.add(user._id, userAgent);

    // generate a token with user id and secret
    const token = jwt.sign({
            _id: user._id,
            iss: "fajs",
            exp: remember ? jwtRememberExpireAfter : jwtExpireAfter,
        },
        JWT_SECRET
    );

    return {
        token,
        user: personalUser(user)
    };
};

const register = async ({
    name,
    username,
    email,
    password,
}) => {
    // TODO: Add recaptcha
    email = email.toLowerCase().replace(/\s+/g, '').trim();
    username = username.toLowerCase().replace(/\s+/g, '').trim();

    // check user exists
    const emailExists = await checkEmailExists({
        email
    });
    if (emailExists) {
        const error = new Error(fa.error.emailExists);
        error.status = 401;
        throw error;
    }

    const usernameExists = await checkUsernameExists({
        username
    });
    if (usernameExists) {
        const error = new Error(fa.error.usernameExists);
        error.status = 401;
        throw error;
    }

    // create user
    const user = await models.User.updateOne({
        email
    }, {
        name,
        username,
        email,
        password: await bcrypt.hash(password, 10),
        status: 'register'
    }, {
        upsert: true,
        new: true
    });

    // update code
    const code = await redis.digitToken.add(email);

    // TODO: send email

    return {
        message: fa.success.register,
    };
};

const checkEmailExists = async ({
    email,
    exceptId
}) => {
    email = email.toLowerCase().replace(/\s+/g, '').trim();

    const user = await models.User.findOne({
        email,
        status: {
            $ne: 'register'
        },
        _id: {
            $ne: exceptId
        }
    });

    return !!user;
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
    verify,
    login,
    register
};