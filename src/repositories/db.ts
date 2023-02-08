import {MongoClient} from "mongodb";


export type VideoArrayTypes = {
    id: number;
    title: string;
    author: string;
    canBeDownloaded: boolean;
    minAgeRestriction?: any;
    createdAt: Date;
    publicationDate: Date;
    availableResolutions: string[];
}

export let videos: VideoArrayTypes[] = []

const mongoUrl = process.env.mongoURL || "mongodb://0.0.0.0:27017"

const client = new MongoClient(mongoUrl)

const db = client.db('shop')

export const videoCollection = db.collection<VideoArrayTypes>('videos')

export async function runDb() {
    try {
        await client.connect()
        await client.db('products').command({ping: 1})
        console.log('Connect to mongo server success')
    } catch {
        console.log('Not connect to mongo server')
        await client.close()
    }
}