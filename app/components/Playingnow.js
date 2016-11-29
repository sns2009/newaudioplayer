import React from 'react';
import R from 'ramda';
import playerParams from '../playerParams';
import CSSModules from 'react-css-modules';
import styles from '../../css/style.css';

class Playingnow extends React.Component {

  constructor() {
    super();
    this.updateName = this.updateName.bind(this);
    this.setLoading = this.setLoading.bind(this);
    this.state = {
      artistSong: 'Artist - Track',
    };
  }


  componentDidUpdate() {
    if (!R.isNil(window.playingTrack)) window.playingTrack.addEventListener('loadedmetadata', this.updateName);
    if (!R.isNil(window.playingTrack)) window.playingTrack.addEventListener('loadstart', this.setLoading);
  }

  setLoading() {
    this.setState({
      artistSong: 'Loading...',
    });
  }

  updateName() {
    let artistSongToShow = `${this.props.tracks[this.props.playingTrackId].artist} - ${this.props.tracks[this.props.playingTrackId].track}`;
    if (artistSongToShow.length > playerParams.trackLettersInPlayingnow) artistSongToShow = 
      artistSongToShow.substr(0, playerParams.trackLettersInPlayingnow - 2).concat(' ...');
    this.setState({
      artistSong: artistSongToShow,
    });
  }

  render() {
    return (<div styleName="playingnow">
              {this.state.artistSong}
            </div>);
  }
}
Playingnow.propTypes = {
  playingTrackId : React.PropTypes.number,
}
export default CSSModules(Playingnow, styles);
