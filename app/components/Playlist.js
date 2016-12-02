import React from 'react';
import CSSModules from 'react-css-modules';
import styles from '../../css/style.css';
import R from 'ramda';
import axios from 'axios';
import Track from './Track';

class Playlist extends React.Component {

  constructor() {
    super();
    this.handleSearch = this.handleSearch.bind(this);
    this.state = { searchValue: '' };
  }

  handleSearch(e) {
    this.setState({
      searchValue: e.target.value,
    });
  }

  render() {
    const filteredTracks = R.filter(
      track => (track.artist.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) === 0 ||
            track.track.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) === 0),
             this.props.tracks);
    let tracksToShow = R.values(R.mapObjIndexed((track, i, obj) => (<Track
      track={track}
      key={i}
      onPlayTrack={this.props.onPlayTrack}
      onPlay={this.props.onPlay}
      onPause={this.props.onPause}
      isPlaying={this.props.isPlaying}
      playingTrackId={this.props.playingTrackId}
      currentTime={this.props.currentTime}
    />), filteredTracks));

    if (this.props.fetching) tracksToShow = (<div styleName="wait">Wait...</div>);
    return (<div styleName="playlist">
              <div styleName="search">
                <div styleName="search-icon" />
                <input styleName="search-text" value={this.state.searchValue} onInput={this.handleSearch} type="text" />
              </div>
              {tracksToShow}
            </div>);
        }
}
Playlist.propTypes = {
  tracks: React.PropTypes.array,
  fetching : React.PropTypes.bool,
  fetched : React.PropTypes.bool,
  isPlaying : React.PropTypes.bool,
  currentTime:  React.PropTypes.number,
  playingTrackId : React.PropTypes.number,
  startTracksFetch : React.PropTypes.func,
  tracksRecieved : React.PropTypes.func,
  fetchTracksError : React.PropTypes.func,
  onPlayTrack : React.PropTypes.func,
  onPlay: React.PropTypes.func,
  onPause: React.PropTypes.func
}
export default CSSModules(Playlist, styles);
