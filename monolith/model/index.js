const { ObjectId } = require("mongodb");
const { db } = require("../db.js");

// INITIALISASI DATABASE BEGIN
const mongodb = db({
    uri: "mongodb://127.0.0.1:27017",
    databaseName: "demoapp",
});
// INITIALISASI DATABASE END

// MODEL GLOBAL BEGIN
const Model = ({ collection }) => {
    return {
        findAll: () => {
            return mongodb.getDB().collection(collection).find().toArray();
        },
        create: (data) => {
            return mongodb.getDB().collection(collection).insertOne(data);
        },
        destroy: ({ id }) => {
            return mongodb
                .getDB()
                .collection(collection)
                .deleteOne({ _id: ObjectId(id) });
        },
    };
};
// MODEL GLOBAL END

// MODELS (Collections) BEGIN
const User = Model({ collection: "users" });

const Product = Model({ collection: "products" });
// MODELS (Collections) END

module.exports = { mongodb, User, Product };
