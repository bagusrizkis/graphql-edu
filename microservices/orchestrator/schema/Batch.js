const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
    type Batch {
        _id: ID
        name: String
    }

    type Query {
        batchs: [Batch]
    }

    type Mutation {
        addBatch(name: String, age: Int): User
    }
`;

const batchs = [
    { _id: "001", name: "Blazing" },
    { _id: "002", name: "Blanford" },
];

const resolvers = {
    Query: {
        batchs: () => batchs,
    },
    Mutation: {
        addBatch: (_, args) => {
            batchs.push({ ...args });
            return batchs;
        },
    },
};

module.exports = {
    typeDefs,
    resolvers,
};
