const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GeoJSON = require('mongoose-geojson-schema');
const getFloatCoord = require('./utils').getFloatCoord;

/*
Example file from google
{
    "locations" : [ {
        "timestampMs" : "1458575411076",
        "latitudeE7" : 511011868,
        "longitudeE7" : 170272799,
        "accuracy" : 30
    }]
}
*/

const TrackSchema = new Schema({
    _createDate: {
        type: Date,
        default: Date.now,
        index: true
    },
    loc: GeoJSON.Point,
    accuracy: Number,
    _user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

if(!TrackSchema.options.toJSON)
    TrackSchema.options.toJSON = {
        virtuals: true
    };

TrackSchema.options.toJSON.transform = function(doc, ret) {
    delete ret._id;
    delete ret._user;
    delete ret.__v;
    delete ret.id;
};

TrackSchema.virtual('timestampMs')
    .get(function() {
        return this._createDate.getTime();
    })
    .set(function(val) {
        this._createDate = new Date(parseInt(val));
    });

const defaultLoc = {
    type: 'Point',
    coordinates: [0, 0]
};

TrackSchema.virtual('latitudeE7')
    .get(function() {
        return this.loc.coordinates[1];
    })
    .set(function(val) {
        if(!this.loc)
            this.loc = defaultLoc;

        this.loc.coordinates[1] = getFloatCoord(val);
    });

TrackSchema.virtual('longitudeE7')
    .get(function() {
        return this.loc.coordinates[0];
    })
    .set(function(val) {
        if(!this.loc)
            this.loc = defaultLoc;

        this.loc.coordinates[0] = getFloatCoord(val);
    });

TrackSchema.index({
    loc: '2dsphere'
});

module.exports = mongoose.model('Track', TrackSchema);
