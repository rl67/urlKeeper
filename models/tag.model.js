const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    // tagList: {
    //     type: mongoose.Schema.Types.Objectid,
    //     ref: "TagList",
    // },
}, {timestamp: true});

const Tag = mongoose.model('Tag', tagSchema);
module.exports = Tag;