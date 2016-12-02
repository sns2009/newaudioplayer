import React from 'react';
import R from 'ramda';
import playerParams from '../playerParams';
import CSSModules from 'react-css-modules';
import styles from '../../css/style.css';

class Track extends React.Component {

  constructor() {
    super();
    this.trackClick = this.trackClick.bind(this);
    this.formatTime = this.formatTime.bind(this);
    this.state = {
      isMounted: true,
      time: '00:00',
    };
  }

  componentDidMount() {

  }

  componentDidUpdate() {

  }

  trackClick(e) {
    e.preventDefault();
    this.props.onPlayTrack(this.props.track.id);

  }

  formatTime(currentTime) {
    let minToShow, secToShow;
    const min = Math.floor(currentTime / 60);
    const s = parseInt(currentTime) - (min * 60);

    if (min < 10) {
      minToShow = `0${min}`;
    } else {
      minToShow = min;
    }

    if (s < 10) {
      secToShow = `0${s}`;
    } else {
      secToShow = s;
    }

    return `${minToShow}:${secToShow}`;
    
  }


  render() {
    let trackStyle = 'track';
    let duration = this.props.track.duration;
    if (this.props.playingTrackId === this.props.track.id && (!R.isNil(this.props.playingTrackId)) && this.props.isTrackMounted) {
      trackStyle = 'track-playing';
      duration = this.formatTime(this.props.currentTime);
    }
    let trackName = `${this.props.track.artist} - ${this.props.track.track}`;
    if (trackName.length > playerParams.trackLettersInPlaylist) trackName = trackName.substr(0, playerParams.trackLettersInPlaylist - 3).concat(' ...');
    return (<div styleName={trackStyle} onClick={this.trackClick}>
              <div styleName="trackname">{trackName}</div>
              <div styleName="duration">{duration}</div>
            </div>);
  }

  componentWillUnmount() {

  }
}
Track.propTypes = {
  playingTrackId : React.PropTypes.number,
  isTrackMounted : React.PropTypes.bool,
  playTrack : React.PropTypes.func,
  trackMount : React.PropTypes.func,
}
export default CSSModules(Track, styles);
