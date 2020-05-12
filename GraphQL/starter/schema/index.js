const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql');
const axios = require('axios');

const Company = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(User),
      async resolve(parentValue, args) {
        const usersData = await axios.get(
          `http://localhost:3000/companies/${parentValue.id}/users`,
        );
        return usersData.data;
      },
    },
  }),
});

const User = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
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
  }),
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
    company: {
      type: Company,
      args: { id: { type: GraphQLString } },
      async resolve(parentValue, args) {
        const company = await axios.get(
          `http://localhost:3000/companies/${args.id}`,
        );
        return company.data;
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    addUser: {
      type: User,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        companyId: { type: GraphQLString },
      },
      async resolve(_, args) {
        const newUser = await axios.post(`http://localhost:3000/users`, args);
        return newUser.data;
      },
    },
    deleteUser: {
      type: User,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(_, { id }) {
        const user = await axios.delete(`http://localhost:3000/users/${id}`);
        return user.data;
      },
    },
    updateUser: {
      type: User,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        companyId: { type: GraphQLString },
      },
      async resolve(_, args) {
        const user = await axios.patch(
          `http://localhost:3000/users/${args.id}`,
          args,
        );
        return user.data;
      },
    },
  },
});

module.exports = new GraphQLSchema({ mutation, query: Root });
