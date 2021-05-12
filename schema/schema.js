const graphql = require('graphql');
const _ = require('lodash');


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

// dummy data
var tagLists = [
    { name: 'commonTags', id: '1' },
    { name: 'woodworking', id: '2' },
    { name: 'metalTurning', id: '3'},
    { name: 'programming', id: '4'},
    { name: 'workshop', id: '5'}
];

var tags = [
    { name: 'toRead', id: '1', tagListId: '1' },
    { name: 'planing', id: '2', tagListId: '2' },
    { name: 'video', id: '3', tagListId: '1' },
    { name: 'algorithm' ,id: '4', tagListId: '4' },
    { name: 'speedsNfeeds', id: '5', tagListId: '3' },
    { name: 'jigs', id: '6', tagListId: '1' },
    { name: 'dowTails', id: '7', tagListId: '2' }
];

var bookMarks = [
    { name: 'DZone', id: '1', tagId: '4' },
    { name: 'Medium', id: '2', tagId: '1' },
    { name: 'Rob Cosman', id: '3', tagId: '2'},
    { name: 'Stumpy Nubs', id: '4', tagId: '1'}
];

// Tag list with its tags
const TagListType = new GraphQLObjectType( {
    name: 'TagList',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        tags: {
            type: new GraphQLList(TagType),
            resolve(parent, args) {
                return _.filter(tags, { tagListId: parent.id } )
            }
        }
    })
});

// Tag with its parent tagList
const TagType = new GraphQLObjectType({
    name: 'Tag',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        tagList: { 
            type: TagListType, 
            resolve(parent, args) {
                return _.find(tagLists, { id: parent.tagListId });
            }
        },
        bookmarks: {
            type: new GraphQLList(BookMarkType),
            resolve(parent, args) {
                return _.filter(bookMarks, { tagId: parent.id })
            }
        }
    })
});

// Bookmark
const BookMarkType = new GraphQLObjectType({
    name: 'BookMark',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        tags: {
            type: new GraphQLList(TagType),
            resolve(parent, args) {
                return  _.filter(tags, {id: parent.tagId } );
            }
        }
    })
});

 
const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        // Return a tagList by id, and all its tags
        tagList: {
            type: TagListType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(tagLists, { id: args.id })
            }
        },
        // Return all tagList objects
        tagLists: {
            type: new GraphQLList(TagListType),
            resolve(parent, args) {
                return tagLists;
            }
        },
        // Return a tag by id
        tag: {
            type: TagType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(tags, { id: args.id });
            }
        },
        // Return all tags
        tags: {
            type: new GraphQLList(TagType),
            resolve(parent, args) {
                return tags;
            }
        },
        // Return a bookmark by index
        bookMark: {
            type: BookMarkType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(bookMarks, { id: args.id } );
            }
        },
        // Return all bookmarks
        bookMarks: {
            type: new GraphQLList(BookMarkType),
            resolve(parent, args) {
                return bookMarks;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
