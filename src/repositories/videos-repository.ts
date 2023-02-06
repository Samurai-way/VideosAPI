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
    findVideos() {
        if (videos) {
            return videos
        }
    },
    createVideo(title: string, author: string, availableResolutions: string[]) {
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
    }
}