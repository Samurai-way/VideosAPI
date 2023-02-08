import {client} from "./db";

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

export const videosRepository = {
    async getVideos(): Promise<VideoArrayTypes[] | undefined> {
        if (videos) {
            return client.db('shop').collection<VideoArrayTypes>('videos').find({}).toArray()
        }
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
        videos.push(newVideo)
        return newVideo
    },
    async getVideo(requestId: number): Promise<VideoArrayTypes | undefined> {
        if (requestId) {
            const video = videos.find((v) => v.id === requestId)
            return video
        }
    },
    async deleteVideo(id: number): Promise<boolean> {
        for (let i = 0; i < videos.length; i++) {
            if (videos[i].id === id) {
                videos.splice(i, 1)
                return true
            }
        }
        return false
    },
    async updateVideo(id: number, title: string, author: string, availableResolutions: string[], canBeDownloaded: boolean, minAgeRestriction: string, publicationDate: Date): Promise<boolean> {
        const findVideo = videos.find(v => v.id === id)
        if (findVideo) {
            findVideo.title = title
            findVideo.author = author
            findVideo.availableResolutions = availableResolutions
            findVideo.canBeDownloaded = canBeDownloaded
            findVideo.minAgeRestriction = +minAgeRestriction
            findVideo.publicationDate = publicationDate
            return true
        } else {
            return false
        }
    }
}