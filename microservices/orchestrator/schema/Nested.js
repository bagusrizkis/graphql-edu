const { gql } = require("apollo-server");

const posts = [
    {
        id: 1,
        title: "Why GraphQL?",
        authorId: 1,
    },
    {
        id: 2,
        title: "Creating a GraphQL API with Apollo Server",
        authorId: 1,
    },
    {
        id: 3,
        title: "This should not be returned",
        authorId: 2,
    },
];

const authors = [{ id: 1, name: "Saransh Kataria" }];

const typeDefs = gql`
    type Query {
        authors: [Author]
    }

    type Author {
        id: ID
        name: String
        posts: [Post]
    }

    type Post {
        id: ID
        title: String
        authorId: ID
    }
`;

const resolvers = {
    Query: {
        authors: () => {
            return authors;
        },
    },
    Author: {
        posts: (author) => {
            return posts.filter((post) => post.authorId === author.id);
        },
    },
    Mutation: {},
};

module.exports = {
    typeDefs,
    resolvers,
};
