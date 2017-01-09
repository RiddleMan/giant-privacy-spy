const mongoose = require('mongoose');
const userPlugin = require('mongoose-user');
const Schema = mongoose.Schema;
const GeoJSON = require('mongoose-geojson-schema');

const UserSchema = new Schema({
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    hashed_password: { type: String, default: '' },
    salt: { type: String, default: '' },
    home: GeoJSON.Point
});

UserSchema.plugin(userPlugin, {});
module.exports = mongoose.model('User', UserSchema);
