const jimp = require('jimp'),
    fs = require('fs'),
    util = require('util'),
    readFile = util.promisify(fs.readFile),
    fa = require('../helper/language/fa.json'),
    sendResponse = require('../utils/sendResponse');



const imageFormats = ['jpg', 'jpeg', 'jpe', 'jif', 'jfif', 'jfi', 'png', 'gif', 'webp', 'tiff', 'tif', 'raw', 'bmp',
    'jp2', 'j2k', 'jpf', 'jpx', 'jpm', 'mj2', 'svg', 'svgz', 'ico'
];


const avatar = async (req, res, next) => {
    try {
        if (!req.file) {
            const error = new Error(fa.error.imageNotFound);
            error.status = 400;
            throw error;
        }
        const file = req.file;
        const format = file.originalname.split('.')[file.originalname.split('.').length - 1];
        if (imageFormats.includes(format.toLowerCase())) {
            req.body.avatar = {
                original: file.path,
                thumbnail: await resize(file.path, 100, 100),
            }
            await next();
        } else {
            await next();
        }
    } catch (error) {
        return sendResponse(res, error.status || 400, {
            error: {
                message: error.message || fa.error.resizeError
            }
        });
    }
};

const one = async (req, res, next) => {
    try {
        if (!req.file) {
            next();
        } else {
            const file = req.file;
            const format = file.originalname.split('.')[file.originalname.split('.').length - 1];
            if (imageFormats.includes(format.toLowerCase())) {
                req.body.image = file.path;
                req.body.thumbnail = await resize(file.path, 300, 300);
                await next();
            } else {
                await next();
            }
        }
    } catch (error) {
        return sendResponse(res, 400, {
            error: {
                message: error.message || fa.error.resizeError
            }
        });
    }
};

async function resize(file, width, height) {
    const read = readFile(__dirname + '/../' + file);
    const realPath = file.split('/').slice(0, -1).join('/');
    const fullname = file.split('/')[file.split('/').length - 1];
    const name = fullname.split('.');
    const write = __dirname + '/../' + realPath + '/' + name.slice(0, -1) + `-size${width}x${height}.` + name[name.length - 1];
    jimp.read(await read, (err, image) => {
        if (err) throw err;
        if (image.bitmap.height < image.bitmap.width) {
            const w = ((image.bitmap.width * width) / (image.bitmap.height * 2)) - (width / 2);
            image
                .resize(jimp.AUTO, width)
                .crop(w, 0, width, height)
                .quality(85)
                .write(write);
        } else {
            const h = ((image.bitmap.height * height) / (image.bitmap.width * 2)) - (height / 2);
            image
                .resize(width, jimp.AUTO)
                .crop(0, h, width, height)
                .quality(85)
                .write(write);
        }
    });
    return realPath + '/' + name.slice(0, -1) + `-size${width}x${height}.` + name[name.length - 1];
};

module.exports = {
    avatar,
    images,
    one
}