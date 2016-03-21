'use strict';
const streamToBuffer = require('stream-to-buffer');
const waterfall = require('run-waterfall');
const ExifImage = require('exif').ExifImage;

const getImageExif = (fileReadStream, cb) => {
    waterfall([
        streamToBuffer.bind(null, fileReadStream),
        (image, cb) => {
            new ExifImage({ //eslint-disable-line
                image
            }, cb);
        }
    ], cb);
};

const convertToDegree = (dms) => {
    const d = parseFloat(dms[0]);
    const m = parseFloat(dms[1]);
    const s = parseFloat(dms[2]);

    return d + (m / 60) + (s / 3600);
};

const getExifCoordinates = (exif) => {
    const latitude = exif.gps.GPSLatitude;
    const latitudeRef = exif.gps.GPSLatitudeRef;
    const longitude = exif.gps.GPSLongitude;
    const longitudeRef = exif.gps.GPSLongitudeRef;
    const res = {
        coordinates: []
    };

    if(longitudeRef === 'E')
        res.coordinates.push(convertToDegree(longitude));
    else
        res.coordinates.push(-convertToDegree(longitude));

    if(latitudeRef === 'N')
        res.coordinates.push(convertToDegree(latitude));
    else
        res.coordinates.push(-convertToDegree(latitude));

    return res;
};

const getExifDate = (exif) => {
    const dateStr = exif.exif.CreateDate;
    const dateHourArr = dateStr.split(' ');
    dateHourArr[0] = dateHourArr[0].replace(/:/g, '/');

    return new Date(dateHourArr.join(' '));
};

module.exports = {
    getImageExif,
    getExifCoordinates,
    getExifDate
};
