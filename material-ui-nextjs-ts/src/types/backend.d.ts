export { }

declare global {
    interface IRequest {
        url: string,
        method?: string,
        body?: { [key: string]: any },
        queryParams?: any,
        useCredentials?: boolean,
        headers?: any,
        nextOption?: any
    }
    interface IBackendResponse<T> {
        error?: string | string[],
        message: string,
        statusCode: number | string,
        data?: T
    }
    interface IMeta {
        current: number,
        pageSize: number,
        pages: number,
        total: number
    }
    interface IModelPaginate<T> {
        meta: IMeta,
        result: T[]
    }
    interface ITrackTop {
        "_id": string,
        "title": string,
        "description": string,
        "category": string,
        "imgUrl": string,
        "trackUrl": string,
        "countLike": number,
        "countPlay": number,
        "uploader": {
            "_id": string,
            "email": string,
            "name": string,
            "role": string,
            "type": string
        },
        "isDeleted": boolean,
        "createdAt": string,
        "updatedAt": string
    }
    interface IExtendITrackTop extends ITrackTop {
        isPlaying: boolean
    }
    interface ITrackContext {
        currentTrack: IExtendITrackTop,
        setCurrentTrack: (v: IExtendITrackTop) => void
    }
    interface ITrackComment {
        "_id": string,
        "content": string,
        "moment": number,
        "user": {
            "_id": string,
            "email": string,
            "name": string,
            "role": string,
            "type": string
        },
        "track": string,
        "isDeleted": boolean,
        "__v": number,
        "isDeleted": boolean,
        "createdAt": string,
        "updatedAt": string
    }
    interface ITrackLike {
        "_id": string,
        "title": string,
        "description": string,
        "category": string,
        "imgUrl": string,
        "trackUrl": string,
        "countLike": number,
        "countPlay": number
    }
    interface IPlaylist<T> {
        "_id": string,
        "title": string,
        "isPublic": boolean,
        "user": string,
        "tracks": T[],
    }
}