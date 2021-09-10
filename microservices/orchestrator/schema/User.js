const { UserInputError, gql } = require("apollo-server");
const { default: axios } = require("axios");

const typeDefs = gql`
    """
    This is user schema that contain data users
    """
    type User {
        """
        id user
        """
        _id: ID
        name: String
        email: String
        age: Int
    }

    extend type Query {
        user(id: ID): User
        users: [User]
    }

    input InputUser {
        name: String
        email: String
        age: Int
    }

    extend type Mutation {
        addUser(input: InputUser): User
    }
`;

const resolvers = {
    Query: {
        user: (_, { ID }) => {
            if (!ID) {
                throw new UserInputError("Invalid argument value");
            } else {
                return axios
                    .get("http://localhost:3002/users/" + ID)
                    .then(({ data }) => {
                        console.log(data);
                        return data.body.users;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },
        users: (parent, args, context, info) => {
            return axios
                .get("http://localhost:3002/users")
                .then(({ data }) => data.body.users);
        },
        aaaa: () => {
            return axios
                .get("http://localhost:3002/users")
                .then(({ data }) => data.body.users);
        },
    },
    Mutation: {
        addUser: (_, { input }) => {
            return axios
                .post("http://localhost:3002/users", { ...input })
                .then(({ data }) => {
                    console.log(data);
                    return data.body.user;
                });
        },
    },
};

module.exports = {
    typeDefs,
    resolvers,
};
