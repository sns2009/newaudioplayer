export function startTracksFetch() {
  return {
    type: 'START_TRACKS_FETCH',
  };
}
export function tracksRecieved(tracks) {
  return {
    type: 'TRACKS_RECIEVED',
    tracks,
  };
}
export function fetchTracksError(error) {
  return {
    type: 'FETCH_TRACKS_ERROR',
    error,
  };
}
export function playTrack(audio,id) {
  return {
    type: 'PLAY_TRACK',
    audio,
    id,
  };
}
export function pause(audio) {
  return {
    type: 'PAUSE',
    audio,
  };
}
export function play(audio) {
  return {
    type: 'PLAY',
    audio,
  };
}
export function next(audio) {
  return {
    type: 'NEXT',
    audio,
  };
}
export function previous(audio) {
  return {
    type: 'PREVIOUS',
    audio,
  };
}
export function trackMount(isTrackMounted) {
  return {
    type: 'TRACK_MOUNT',
    isTrackMounted,
  };
}
export function updateVolume(volume) {
  return {
    type: 'UPDATE_VOLUME',
    volume,

  };
}
export function setVolume(audio) {
  return {
    type: 'SET_VOLUME',
    audio,

  };
}
export function setTime(audio) {
  return {
    type: 'SET_TIME',
    audio,

  };
}
export function updatePosition(audio) {
  return {
    type: 'UPDATE_POSITION',
    audio,

  };
}
export function setIsLoading(status) {
  return {
    type: 'SET_IS_LOADING',
    status,

  };
}