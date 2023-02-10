import {VideoArrayTypes, videoCollection} from "../repositories/db";


export const videosService = {
    async getVideos(): Promise<VideoArrayTypes[] | undefined> {
        return videoCollection.find({}).toArray()
    },
    async createVideo(title: string, author: string, availableResolutions: string[]): Promise<VideoArrayTypes> {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const newVideo: VideoArrayTypes = {
            id: +(new Date()),
            title,
            author,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: new Date(),
            publicationDate: tomorrow,
            availableResolutions: availableResolutions
        }
        const result = await videoCollection.insertOne(newVideo)
        return newVideo
    },
    async getVideo(requestId: number): Promise<VideoArrayTypes | null> {
        const video: VideoArrayTypes | null = await videoCollection.findOne({id: requestId})
        if (video) {
            return video
        } else {
            return null
        }
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