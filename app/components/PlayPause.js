import React from 'react';
import CSSModules from 'react-css-modules';
import R from 'ramda';
import styles from '../../css/style.css';

class PlayPause extends React.Component {

  constructor() {
    super();
    this.playPauseClick = this.playPauseClick.bind(this);
  }

  playPauseClick(e) {
    e.preventDefault();
    if (!R.isNil(this.props.playingTrackId)) {
      if (this.props.isPlaying) {
        this.props.pause();
      } else {
        this.props.play();
      }
    }
  }

  render() {
    const playOrPause = this.props.isPlaying ? 'pause' : 'play';
    return (<div onClick={this.playPauseClick} styleName={playOrPause} />);
  }
}
PlayPause.propTypes = {
  playingTrackId : React.PropTypes.number,
  isPlaying : React.PropTypes.bool,
  pause : React.PropTypes.func,
  play : React.PropTypes.func,
}
export default CSSModules(PlayPause, styles);
