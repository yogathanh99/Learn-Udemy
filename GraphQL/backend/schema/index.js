const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} = require('graphql');
const axios = require('axios');

const Company = new GraphQLObjectType({
  name: 'Company',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
  },
});

const User = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: Company,
      async resolve(parentValue, args) {
        const companyData = await axios.get(
          `http://localhost:3000/companies/${parentValue.companyId}`,
        );
        return companyData.data;
      },
    },
  },
});

const Root = new GraphQLObjectType({
  name: 'Root',
  fields: {
    user: {
      type: User,
      args: { id: { type: GraphQLString } },
      async resolve(parentValue, args) {
        const user = await axios.get(`http://localhost:3000/users/${args.id}`);
        return user.data;
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: Root });
