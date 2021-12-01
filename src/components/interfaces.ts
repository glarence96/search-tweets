export interface tweet {
    id: string,
    text: string
}

export interface tweetsRes {
    data: tweet[],
    meta: {
        newest_id: string,
        oldest_id: string,
        result_count: number,
        next_token: string
    }
}

export interface reducerState {
    tweetsRes: tweetsRes
}

export interface appState {
    tweetsReducer: reducerState
}