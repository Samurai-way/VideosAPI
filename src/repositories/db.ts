import {MongoClient} from "mongodb";

const mongoUrl = process.env.mongoURL || "mongo://0.0.0.0:27017"

export const client = new MongoClient(mongoUrl)

export async function runDb(){
    try{
        await client.connect()
        await client.db('products').command({ping: 1})
        console.log('Connect to mongo server success')
    }catch {
        console.log('Not connect to mongo server')
        await client.close()
    }
}