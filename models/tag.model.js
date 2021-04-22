const tagSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        required: false,
    },
    tagList: {
        type: Schema.Types.Objectid,
        ref: "TagList",
    },
}, {timestamp: true});

const Tag = mongoose.model('Tag', tagSchema);
module.exports = Tag;