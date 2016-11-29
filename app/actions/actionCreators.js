export function startTracksFetch() {
  return {
    type: 'START_TRACKS_FETCH',
  };
}
export function tracksRecieved(tracks) {
  return {
    type: 'TRACKS_RECIEVED',
    tracks
  };
}
export function fetchTracksError(error) {
  return {
    type: 'FETCH_TRACKS_ERROR',
    error,
  };
}
export function playTrack(id) {
  return {
    type: 'PLAY_TRACK',
    id,
  };
}
export function pause() {
  return {
    type: 'PAUSE',
  };
}
export function play() {
  return {
    type: 'PLAY',
  };
}
export function next() {
  return {
    type: 'NEXT',
  };
}
export function previous() {
  return {
    type: 'PREVIOUS',
  };
}
export function trackMount(isTrackMounted) {
  return {
    type: 'TRACK_MOUNT',
    isTrackMounted,
  };
}
export function setVolume(volume, volumeBarWidth) {
  return {
    type: 'VOLUME',
    volume,
    volumeBarWidth,
  };
}
