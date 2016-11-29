import R from 'ramda';
import playerParams from '../playerParams';

export default function reducer(state = { fetching: false,
  fetched: false,
  tracks: {},
  playingTrack: null,
  isPlaying: false,
  playingTrackId: null,
  volume: 0.5,
  volumeBarWidth: 100,
  isTrackMounted: true,
}, action) {
  switch (action.type) {
    case 'START_TRACKS_FETCH': {
      return R.merge(state, { fetching: true }); }

    case 'TRACKS_RECIEVED': {
      const mapIndexed = R.addIndex(R.map);
      let durationShort;
      const tracks = R.take(playerParams.tracksInPlaylist, mapIndexed((track, id) => {
        if (track.track_duration.indexOf('00:') === 0) durationShort = track.track_duration.slice(3);
        return {
          id,
          artist: track.artist_name,
          track: track.track_title,
          duration: durationShort,
          url: track.track_file_url,
        };
      }, action.tracks.aTracks));
      return R.merge(state, { tracks, fetching: false }); }

    case 'FETCH_TRACKS_ERROR': {
      return R.merge(state, { tracks, fetching: false }); }

    case 'PLAY_TRACK': {
      let playingTrack = state.playingTrack;
      if (!R.isNil(playingTrack)) playingTrack.pause();
      playingTrack = new Audio(state.tracks[action.id].url);
      window.playingTrack = playingTrack;
      playingTrack.play();
      playingTrack.volume = state.volume;
      return R.merge(state, { playingTrack, isPlaying: true, playingTrackId: action.id }); }

    case 'PAUSE': {
      const playingTrack = state.playingTrack;
      playingTrack.pause();
      return R.merge(state, { playingTrack, isPlaying: false }); }

    case 'PLAY': {
      const playingTrack = state.playingTrack;
      if (!R.isNil(state.playingTrack)) {
        playingTrack.play();
      } else {
        playingTrack.pause();
      }
      return R.merge(state, { playingTrack, isPlaying: true }); }

    case 'NEXT': {
      let playingTrack = state.playingTrack;
      const playingTrackId = state.playingTrackId;
      let nextId = playingTrackId + 1;
      if (nextId > (R.length(state.tracks) - 1)) nextId = 0;
      if (!R.isNil(playingTrack)) {
        playingTrack = state.playingTrack;
        playingTrack.pause();
        playingTrack = new Audio(state.tracks[nextId].url);
        window.playingTrack = playingTrack;
        playingTrack.play();
      }
      return R.merge(state, { playingTrack, isPlaying: true, playingTrackId: nextId }); }

    case 'PREVIOUS': {
      let playingTrack = state.playingTrack;
      const playingTrackId = state.playingTrackId;
      let previousId = playingTrackId - 1;
      if (previousId < 0) previousId = R.length(state.tracks) - 1;
      if (!R.isNil(playingTrack)) {
        playingTrack = state.playingTrack;
        playingTrack.pause();
        playingTrack = new Audio(state.tracks[previousId].url);
        window.playingTrack = playingTrack;
        playingTrack.play();
      }
      return R.merge(state, { playingTrack, isPlaying: true, playingTrackId: previousId }); }

    case 'TRACK_MOUNT': {
      return R.merge(state, { isTrackMounted: action.isTrackMounted }); }

    case 'VOLUME': {
      const playingTrack = state.playingTrack;
      playingTrack.volume = action.volume;
      return R.merge(state, { playingTrack, volume: action.volume, volumeBarWidth: action.volumeBarWidth }); }


    default: return state;
  }
}

