import R from 'ramda';
import playerParams from '../playerParams';
import axios from 'axios';


const initialState = { fetching: false,
  fetched: false,
  tracks: {},
  isPlaying: false,
  percent: 0,
  volume: 1,
  duration: 0,
  playingTrackId: null,
  isTrackMounted: true,
  isLoading: false,
  currentTime: 0
};

// function getSongIndex(songs, id) {
//   return findIndex(songs, (o) => o.id === id);
// }

// function getAdjacentSong(songs, startIndex, direction) {
//   let nextIndex = startIndex + direction;
//   nextIndex = nextIndex < 0 ? songs.length-1 : nextIndex > songs.length-1 ? 0 : nextIndex;
//   return songs[nextIndex].id;
// }

function getAudioState(audio) {
  var audioState = {
    isPlaying: !audio.paused,
    percent: audio.currentTime / audio.duration,
    duration: audio.duration,
    volume: audio.volume,
    currentTime: audio.currentTime
  }
  return audioState;
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'START_TRACKS_FETCH': {
      return R.merge(state, { fetching: true }); }

    case 'TRACKS_RECIEVED': {
      const mapIndexed = R.addIndex(R.map);
      console.log(action.tracks.tracks);
      const tracks = R.take(playerParams.tracksInPlaylist, mapIndexed((track, id) => {
        return {
          id,
          artist: track.artist_name,
          track: track.track_title,
          duration: track.track_duration,
          url: track.track_url,
        };
      }, action.tracks.tracks));
      return R.merge(state, { tracks, fetching: false }); }

    case 'FETCH_TRACKS_ERROR': {
      return R.merge(state, { tracks, fetching: false }); }

    case 'TRACK_MOUNT': {
      return R.merge(state, { isTrackMounted: action.isTrackMounted }); }

    case 'PLAY_TRACK':{
      let id = action.id || 0;
      return R.merge(state, { playingTrackId: id, isPlaying: true }, getAudioState(action.audio)); }

    case 'PLAY':{
      return R.merge(state, {isPlaying: false} );
    }
    case 'PAUSE':{
      return R.merge(state, getAudioState(action.audio) );
    }

    case 'NEXT': {
      const playingTrackId = state.playingTrackId;
      let nextId = playingTrackId + 1;
      if (nextId > (R.length(state.tracks) - 1)) nextId = 0;
      return R.merge(state, {isPlaying: true, playingTrackId: nextId}, getAudioState(action.audio) ); }

    case 'PREVIOUS': {
      let playingTrack = state.playingTrack;
      const playingTrackId = state.playingTrackId;
      let previousId = playingTrackId - 1;
      if(previousId < 0) previousId = R.length(state.tracks) - 1;
      return R.merge(state, {isPlaying: true, playingTrackId: previousId}, getAudioState(action.audio) ); }

    case 'UPDATE_VOLUME':{
      return R.merge(state, {volume: action.volume} );
    }

    case 'SET_VOLUME':{
      return R.merge(state, getAudioState(action.audio) );
    }
    

    case 'SET_TIME':{
      return R.merge(state, getAudioState(action.audio) );
    }

    case 'UPDATE_POSITION':{
      return R.merge(state, getAudioState(action.audio) );
    }

    case 'SET_IS_LOADING':{
      return R.merge(state, {isLoading: action.status} );
    }




    default: return state;
  }
}

