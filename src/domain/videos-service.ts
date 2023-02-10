import {VideoArrayTypes} from "../repositories/db";
import {videosRepository} from "../repositories/videos-repository-db";


export const videosService = {
    async getVideos(): Promise<VideoArrayTypes[] | undefined> {
        return videosRepository.getVideos()
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
        const createVideo = await videosRepository.createVideo(newVideo)
        return createVideo
    },
    async getVideo(requestId: number): Promise<VideoArrayTypes | null> {
        return videosRepository.getVideo(requestId)

    },
    async deleteVideo(id: number): Promise<boolean> {
        return await videosRepository.deleteVideo(id)
    },
    async updateVideo(id: number, title: string, author: string, availableResolutions: string[], canBeDownloaded: boolean, minAgeRestriction: string, publicationDate: Date): Promise<boolean> {
        return await videosRepository.updateVideo(id, title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate)
    }
}