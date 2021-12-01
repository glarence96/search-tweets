import React, { FunctionComponent, useState } from "react";
import { connect } from "react-redux";
import { Button, Grid, IconButton, TextField, Box } from "@mui/material";
import { Twitter, Search, Notifications } from "@mui/icons-material";
import { TwitterTweetEmbed } from "react-twitter-embed";

import {fetchTweets, fetchMoreTweets} from '../state/actions/index'
import {appState, tweetsRes} from "./interfaces";

interface Props {
	tweetsRes: tweetsRes,
    fetchTweets: (query: string) => any,
    fetchMoreTweets: (query: string, next_token: string) => any
}

const TweetsSearcher: FunctionComponent<Props> = ({tweetsRes, fetchTweets, fetchMoreTweets}) => {    
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSearch = (e?: any) => {
        e.preventDefault()
        fetchTweets(query)
    }

    const handleLoadMore = () => fetchMoreTweets(query, tweetsRes.meta.next_token)

    const options = {
        cards: "hidden",
        align: "center",
        width: "100%",
        height: "400",
        conversation: "none",
    };
    
    return(
        <>
        <Grid container justifyContent='center' marginTop='5%' rowSpacing={1}>
            <Grid item container xs={12} md={6}>
                <Grid item xs={2}>
                    <IconButton>
                        <Twitter color='primary' />
                    </IconButton>
                </Grid>
                
                <Grid item xs={6}>
                    <form onSubmit={handleSearch}>
                        <TextField label="Search" variant="outlined" fullWidth onChange={(e) => setQuery(e.target.value)}/>
                    </form>
                </Grid>

                <Grid item xs={2}>
                    <IconButton onClick={handleSearch}>
                        <Search />
                    </IconButton>
                </Grid>

                <Grid item xs={2}>
                    <IconButton onClick={() => {}}>
                        <Notifications />
                    </IconButton>
                </Grid>

                {tweetsRes && tweetsRes.data && <Grid item xs={12}>
                    {tweetsRes.data.map((tweet, index) => {
                        // setLoading(true)
                        // if(index === tweetsRes.data.length - 1) setLoading(false)
                        return (
                            <Box width='100%'>
                                <TwitterTweetEmbed key={tweet.id} options={options} tweetId={tweet.id} />
                            </Box>
                        )
                    })}
                </Grid>}

                <Grid item justifyContent='flex-end' xs={4}>
                    <Button variant="text" onClick={handleLoadMore}>
                        Load More
                    </Button>
                </Grid>
            </Grid>
        </Grid>
        </>
    )
}

const mapStateToProps = (state: appState) => {
    return {
        tweetsRes: state.tweetsReducer.tweetsRes
    }
};

export default connect(mapStateToProps, { fetchTweets, fetchMoreTweets })(TweetsSearcher);