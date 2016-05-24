'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const parallel = require('run-parallel');

const TagSchema = new Schema({
    name: {
        type: String,
        index: true
    },
    _user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

if(!TagSchema.options.toJSON)
    TagSchema.options.toJSON = {
        virtuals: true,
        transform: function(doc, ret) {
            delete ret._user;
            delete ret.__v;
            delete ret.id;
        }
    };

TagSchema.statics.getAll = function(user, cb) {
    this.model('Tag').find({
        _user: user
    })
    .exec(cb);
};

TagSchema.statics.createIfNotExists = function({
    _user,
    tags
}, cb) {
    const TagModel = this.model('Tag');
    const createCbs = tags.map((tag) =>
        (cb) => TagModel.findOneAndUpdate({
            name: tag,
            _user: _user
        }, {
            name: tag,
            _user: _user
        }, {
            upsert: true
        }, cb));

    parallel(createCbs, cb);
};

module.exports = mongoose.model('Tag', TagSchema);
