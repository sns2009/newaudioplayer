import React from 'react';
import R from 'ramda';
import playerParams from '../playerParams';
import CSSModules from 'react-css-modules';
import styles from '../../css/style.css';

class Track extends React.Component {

  constructor() {
    super();
    this.trackClick = this.trackClick.bind(this);
    this.durationTimeUpdate = this.durationTimeUpdate.bind(this);
    this.state = {
      isMounted: true,
      time: '00:00',
    };
  }

  componentDidMount() {

    this.props.trackMount(true);
  }

  componentDidUpdate() {
    if (!R.isNil(window.playingTrack)) window.playingTrack.addEventListener('timeupdate', this.durationTimeUpdate);
  }

  trackClick(e) {
    e.preventDefault();
    this.props.playTrack(this.props.track.id);
    window.playingTrack.addEventListener('timeupdate', this.durationTimeUpdate);
  }

  durationTimeUpdate() {
    let minToShow,
      secToShow;
    const min = Math.floor(window.playingTrack.currentTime / 60);
    const s = parseInt(window.playingTrack.currentTime) - (min * 60);


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

    if (this.props.isTrackMounted) {
      this.setState({
        time: `${minToShow}:${secToShow}`,
      });
    }
  }


  render() {
    let trackStyle = 'track';
    let duration = this.props.track.duration;
    if (this.props.playingTrackId === this.props.track.id && (!R.isNil(this.props.playingTrackId)) && this.props.isTrackMounted) {
      trackStyle = 'track-playing';
      duration = this.state.time;
    }
    let trackName = `${this.props.track.artist} - ${this.props.track.track}`;
    if (trackName.length > playerParams.trackLettersInPlaylist) trackName = trackName.substr(0, playerParams.trackLettersInPlaylist - 3).concat(' ...');
    return (<div styleName={trackStyle} onClick={this.trackClick}>
              <div styleName="trackname">{trackName}</div>
              <div styleName="duration">{duration}</div>
            </div>);
  }

  componentWillUnmount() {
    this.props.trackMount(false);
    window.playingTrack.removeEventListener('timeupdate', this.durationTimeUpdate);
  }
}
Track.propTypes = {
  playingTrackId : React.PropTypes.number,
  isTrackMounted : React.PropTypes.bool,
  playTrack : React.PropTypes.func,
  trackMount : React.PropTypes.func,
}
export default CSSModules(Track, styles);
