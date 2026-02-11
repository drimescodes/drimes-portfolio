import React, { useEffect, useState } from 'react';
import querystring from 'querystring';
// Remove Buffer import - we'll use browser-native btoa()
import {AiOutlinePauseCircle} from 'react-icons/ai';
import {BiErrorCircle} from 'react-icons/bi'
import {HiOutlineStatusOffline} from 'react-icons/hi'
import {soundbar} from '../assets';

//Setting up the Spotify API and Endpoints
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const refresh_token = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN;

//Function to generate an access token using the refresh token everytime the website is opened or refreshed
export const getAccessToken = async (client_id, client_secret, refresh_token) => {
    // Use browser-native btoa() instead of Buffer
    const basic = btoa(`${client_id}:${client_secret}`);

    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token,
        }),
    });

  return response.json();
};

//Uses the access token to fetch the currently playing song
export const getNowPlaying = async () => {
  try {
    //Generating an access token
    const { access_token } = await getAccessToken(client_id, client_secret, refresh_token);

    //Fetching the response
    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    //If response status > 400 means there was some error while fetching the required information
    if (response.status > 400) {
      throw new Error('Unable to Fetch Song');
    } else if(response.status === 204) {
      throw new Error('Currently Not Playing')
    }

    //Extracting the required data from the response into seperate variables
    const song = await response.json();
    const albumImageUrl = song.item.album.images[0].url;
    const artist = song.item.artists.map((artist) => artist.name).join(', ');
    const isPlaying = song.is_playing;
    const songUrl = song.item.external_urls.spotify;
    const title = song.item.name;
    const timePlayed = song.progress_ms;
    const timeTotal = song.item.duration_ms;
    const artistUrl = song.item.album.artists[0].external_urls.spotify;

    //Returning the song details
    return {
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title,
      timePlayed,
      timeTotal,
      artistUrl
    };
  } catch (error) {
    console.error('Error fetching currently playing song: ', error);
    return error.message.toString();
  }
};

//Main function to process the data and render the widget
const NowPlaying = () => {
  //Hold information about the currently playing song
  const [nowPlaying, setNowPlaying] = useState(null);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      const data = await getNowPlaying();
      setNowPlaying(data)
    };

    //The spotify API does not support web sockets, so inorder to keep updating the currently playing song and time elapsed - we call the API every second
    const interval = setInterval(() => {
      fetchNowPlaying();
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  //Setting default values for the listener's current state and the duration of the song played
  let playerState = ''
  let secondsPlayed = 0, minutesPlayed = 0, secondsTotal = 0, minutesTotal = 0;
  let albumImageUrl = './images/albumCover.png'
  let title = ''
  let artist = ''

  if (nowPlaying != null && nowPlaying.title) {
    //Used while displaing a sounbar/pause icon on the widget
    nowPlaying.isPlaying ? playerState = 'PLAY' : playerState = 'PAUSE'

    //Converting the playback duration from seconds to minutes and seconds
    secondsPlayed = Math.floor(nowPlaying.timePlayed/1000);
    minutesPlayed = Math.floor(secondsPlayed/60);
    secondsPlayed = secondsPlayed % 60;

    //Converting the song duration from seconds to minutes and seconds
    secondsTotal = Math.floor(nowPlaying.timeTotal/1000);
    minutesTotal = Math.floor(secondsTotal/60);
    secondsTotal = secondsTotal % 60;

    albumImageUrl = nowPlaying.albumImageUrl
    title = nowPlaying.title
    artist = nowPlaying.artist
  } else if (nowPlaying === 'Currently Not Playing') {
    playerState = 'OFFLINE' 
    title = 'Drimes is'
    artist = 'currently Offline'
  } else {
    title = 'Failed to'
    artist = 'fetch song'
  }

  //Used to set 0 as padding when the it is a single digit number
  const pad = (n) =>{
    return (n < 10) ? ("0" + n) : n;
  }


  const progressPercent = nowPlaying?.timePlayed && nowPlaying?.timeTotal
  ? Math.min((nowPlaying.timePlayed / nowPlaying.timeTotal) * 100, 100)
  : 0;
  return (
    <a
      href={
        playerState === "PLAY" || playerState === "PAUSE"
          ? nowPlaying.songUrl
          : "#"
      }
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <div className="flex items-center gap-4 p-4 rounded-xl bg-[#2b2b2e] hover:bg-[#333336] transition duration-300 shadow-md border border-[#3a3a3d]">
        {/* Album Art */}
        <div className="w-14 h-14 flex-shrink-0 rounded-md overflow-hidden">
          <img
            src={albumImageUrl}
            alt="Album"
            className="w-full h-full object-cover"
          />
        </div>
  
        {/* Track Info */}
        <div className="flex-1 overflow-hidden">
          <p
            className={`text-sm font-medium text-white truncate ${
              title.length > 15 ? "animate-marquee sm:animate-none whitespace-nowrap" : ""
            }`}
          >
            {playerState === "PLAY" || playerState === "PAUSE" ? title : title}
          </p>
          <p className="text-xs text-gray-400 truncate">
            {playerState === "PLAY" || playerState === "PAUSE"
              ? artist
              : artist}
          </p>
         
          <div className="mt-1 w-full">
  {/* Time Labels */}
  <div className="flex justify-between text-[10px] text-gray-400 mb-[2px]">
    <span>{pad(minutesPlayed)}:{pad(secondsPlayed)}</span>
    <span>{pad(minutesTotal)}:{pad(secondsTotal)}</span>
  </div>

  {/* Progress Bar */}
  <div className="w-full h-[4px] bg-[#444] rounded overflow-hidden">
    <div
      className="h-full bg-white transition-all duration-300"
      style={{ width: `${progressPercent}%` }}
    />
  </div>
</div>
        </div>
  
        {/* Icon */}
        <div className="flex-shrink-0 text-white">
          {playerState === "PLAY" ? (
            <img
              src={soundbar}
              alt="Playing"
              className="w-8 h-8 rounded-lg"
            />
          ) : playerState === "PAUSE" ? (
            <AiOutlinePauseCircle size={40} />
          ) : playerState === "OFFLINE" ? (
            <HiOutlineStatusOffline size={40} />
          ) : (
            <BiErrorCircle size={24} />
          )}
        </div>
      </div>
    </a>
  );
  
  
};

export default NowPlaying;