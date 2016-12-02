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

  componentDidMount() {

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
      trackMount={this.props.trackMount}
      isTrackMounted={this.props.isTrackMounted}
      playingTrackId={this.props.playingTrackId}
      next={this.props.next}
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
  playingTrackId : React.PropTypes.number,
  fetching : React.PropTypes.bool,
  fetched : React.PropTypes.bool,
  isTrackMounted : React.PropTypes.bool,
  startTracksFetch : React.PropTypes.func,
  tracksRecieved : React.PropTypes.func,
  fetchTracksError : React.PropTypes.func,
  onPlayTrack : React.PropTypes.func,
  trackMount : React.PropTypes.func,
}
export default CSSModules(Playlist, styles);
