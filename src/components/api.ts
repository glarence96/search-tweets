import axios from "axios"
import { tweetsRes } from "./interfaces"

const BASE_URL = process.env.REACT_APP_API + "/twitter"
const SEARCH_URL = BASE_URL + "/tweets"

export const searchTweets = async (params: {
    query: string,
    max_results: number,
    next_token?: string
}) => {
    const response = await axios.get<{tweetsData: tweetsRes}>(SEARCH_URL, {params})
    return response.data
}