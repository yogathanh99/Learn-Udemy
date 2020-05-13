const _ = require('lodash');
const { GraphQLSchema } = require('graphql');

const RootQueryType = require('./root_query_type');
const mutations = require('./mutations');

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: mutations,
});
module.exports = schema;
