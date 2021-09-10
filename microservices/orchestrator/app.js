const { ApolloServer, gql } = require("apollo-server");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const userSchema = require("./schema/User");
const batchSchema = require("./schema/Batch");
const nestedSchema = require("./schema/Nested");

const typeDefs = gql`
    schema {
        query: Query
        mutation: Mutation
    }

    type Query {
        halo: String
        aaaa: [User]
    }

    type Mutation
`;

const resolvers = {
    Query: {
        halo: () => "Hello World!",
    },
};

const schema = makeExecutableSchema({
    typeDefs: [
        typeDefs,
        userSchema.typeDefs,
        batchSchema.typeDefs,
        nestedSchema.typeDefs,
    ],
    resolvers: [
        resolvers,
        userSchema.resolvers,
        batchSchema.resolvers,
        nestedSchema.resolvers,
    ],
});

const server = new ApolloServer({
    schema: schema,
});

server.listen().then(({ url }) => {
    console.log(`Server ready at: ${url}`);
});
