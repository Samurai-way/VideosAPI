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
    },
    findVideo(requestId: number){
        if(requestId){
            const video = videos.find((v) => v.id === +requestId)
            return video
        }
    },
    deleteVideo(id: number){
        if(id){
            const video = videos.filter(b => b.id !== id)
            return video
        }
    },
    putVideo(id: number, title: string, author: string, availableResolutions: string[], canBeDownloaded: boolean, minAgeRestriction: string, publicationDate: Date){
        const findVideo = videos.find(v => v.id === id)
        if (findVideo) {
            findVideo.title = title
            findVideo.author = author
            findVideo.availableResolutions = availableResolutions
            findVideo.canBeDownloaded = canBeDownloaded
            findVideo.minAgeRestriction = +minAgeRestriction
            findVideo.publicationDate = publicationDate
            return findVideo
        }
    }
}