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
    { name: 'downTails', id: '7', tagListId: '2' }
];

const TagListType = new GraphQLObjectType( {
    name: 'TagList',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString }
    })
});

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
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        tagLists: {
            type: new GraphQLList(TagListType),
            resolve(parent, args) {
                return tagLists;
            }
        },
        tag: {
            type: TagType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(tags, { id: args.id });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
