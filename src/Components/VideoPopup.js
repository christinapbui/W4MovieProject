import React, { useState, useEffect } from 'react';
import YouTube from '@u-wave/react-youtube';
import './../App.css';

const VideoPopup = (props) => {
    const apiKey = '14571cc48a09b723f51bd74640df3d50';
    const [videoId, setVideoId] = useState(undefined)

    const getMovieVideo = async () => {
        let url = `https://api.themoviedb.org/3/movie/${props.id}/videos?api_key=${apiKey}&language=en-US`
        let data = await fetch(url)
        let result = await data.json();
        console.log(result);
        setVideoId(result.results[0].key)
    }
    useEffect(() => {
        getMovieVideo()
        
    }, [videoId])

    return (
        <div className="VideoPopup-div">
            <button onClick={props.onClose}>Close</button>
            {
                videoId == undefined ? "Loading" :
                    <YouTube
                        className="VideoPopup-youtube"
                        video={videoId}
                        autoplay
                    />
            }
        </div>

    )
}

export default VideoPopup;