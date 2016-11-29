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
    const fetched = this.props.fetched;
    if (!fetched) {
      this.props.startTracksFetch();
      axios.get('https://freemusicarchive.org/featured.json').then((response) => {
        this.props.tracksRecieved(response.data);
      }).catch((error) => {
        this.props.fetchTracksError(error);
      });
    }
  }

  handleSearch(e) {
    this.setState({
      searchValue: e.target.value,
    });
  }

  render() {
    const filteredTracks = R.filter(track => (track.artist.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) === 0 ||
            track.track.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) === 0), this.props.tracks);
    let tracksToShow = R.values(R.mapObjIndexed((track, i, obj) => (<Track
      track={track}
      key={i}
      playTrack={this.props.playTrack}
      trackMount={this.props.trackMount}
      isTrackMounted={this.props.isTrackMounted}
      playingTrackId={this.props.playingTrackId}
      next={this.props.next}
    />), filteredTracks));

    if (this.props.fetching) tracksToShow = (<div styleName="wait">Wait...</div>);
    return (<div styleName="playlist">
              <div styleName="search">
                <div styleName="search-icon" />
                <input styleName="search-text" value={this.state.searchValue} onChange={this.handleSearch} type="text" />
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
  playTrack : React.PropTypes.func,
  trackMount : React.PropTypes.func,
}
export default CSSModules(Playlist, styles);
