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
    { name: 'planing', id: '2', tagListid: '2' },
    { name: 'video', id: '3', tagListid: '1' },
    { name: 'algorithm' ,id: '4', tagListId: '4' },
    { name: 'speedsNfeeds', id: '5', tagListId: '3' },
    { name: 'jigs', id: '6', tagListId: '1' },
    { name: 'downTails', id: '7', tagListId: '2' }
];

const TagListsType = new GraphQLObjectType( {
    name: 'TagList',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        tagLists: {
            type: new GraphQLList(TagListsType),
            resolve(parent, args) {
                return tagLists;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
