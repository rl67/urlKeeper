const mongoose = require('mongoose');

const urlSchema = new Schema({
    url: {
        type: String,
        required: true,
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: "Tag"
    }]
}, {timestamp: true});

const Url = mongoose.model('Url', urlSchema);
module.exports = Url;