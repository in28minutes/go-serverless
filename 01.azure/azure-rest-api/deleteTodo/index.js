const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId

module.exports = async function (context, req) {

    //req.body
    const URL = process.env.MONGODB_URL;
    const DATABASE_NAME = process.env.MONGODB_DATABASE_NAME;//'serverless'
    const COLLECTION_NAME = process.env.MONGODB_COLLECTION_NAME;//'todos'

    const connection = await MongoClient.connect(URL)
    const todoCollection = connection.db(DATABASE_NAME)
        .collection(COLLECTION_NAME)

    const results = await todoCollection
        .deleteOne(
            { _id: ObjectId(req.params.id) }
        )

    await connection.close()

    return {
        body: '{"message":"success"}'
    };

}