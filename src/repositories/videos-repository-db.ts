import {VideoArrayTypes, videoCollection} from "./db";


export const videosRepository = {
    async getVideos(): Promise<VideoArrayTypes[] | undefined> {
        return videoCollection.find({}).toArray()
    },
    async createVideo(newVideo: VideoArrayTypes): Promise<VideoArrayTypes | any> {
        const result = await videoCollection.insertOne(newVideo)
        return result
    },
    async getVideo(requestId: number): Promise<VideoArrayTypes | null> {
        const video: VideoArrayTypes | null = await videoCollection.findOne({id: requestId})
        if (!video) return null
        return video
    },
    async deleteVideo(id: number): Promise<boolean> {
        const result = await videoCollection.deleteOne({id: id})
        return result.deletedCount === 1
    },
    async updateVideo(id: number, title: string, author: string, availableResolutions: string[], canBeDownloaded: boolean, minAgeRestriction: string, publicationDate: Date): Promise<boolean> {
        const result = await videoCollection.updateOne({id: id}, {
            $set: {
                title: title,
                author: author,
                availableResolutions: availableResolutions,
                canBeDownloaded: canBeDownloaded,
                minAgeRestriction: +minAgeRestriction,
                publicationDate: publicationDate
            }
        })
        return result.matchedCount === 1
    }
}