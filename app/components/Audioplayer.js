import React from 'react';
import ReactDOM from 'react-dom';
import R from 'ramda';
import axios from 'axios';
import CSSModules from 'react-css-modules';
import styles from '../../css/style.css';
import Audio from './Audio';
import Playingnow from './Playingnow';
import Progressbar from './Progressbar';
import Previous from './Previous';
import PlayPause from './PlayPause';
import Next from './Next';
import Volume from './Volume';
import Playlist from './Playlist'



class Audioplayer extends React.Component {

   constructor(props) {
      super(props);
      this.handleTimeupdate = this.handleTimeupdate.bind(this);
      this.handlePlayTrack = this.handlePlayTrack.bind(this);
      this.handlePlay = this.handlePlay.bind(this);
      this.handlePause = this.handlePause.bind(this);
      this.handleNext = this.handleNext.bind(this);
      this.handlePrevious = this.handlePrevious.bind(this);
      this.handleSetVolume = this.handleSetVolume.bind(this);
      this.handleProgressBarClick = this.handleProgressBarClick.bind(this);
      this.handleEnd = this.handleEnd.bind(this);
      this.handleStartLoading = this.handleStartLoading.bind(this);
      this.handleNameUpdate = this.handleNameUpdate.bind(this);
    }

  componentDidMount(){
    if (!this.props.fetched) {
      this.props.startTracksFetch();
      axios.get('tracks/tracks.json').then((response) => {
        this.props.tracksRecieved(response.data);
      }).catch((error) => {
        this.props.fetchTracksError(error);
      });
    }
    this.props.updateVolume(ReactDOM.findDOMNode(this.refs.audio), this.props.store.volume);
    this.props.setTime(ReactDOM.findDOMNode(this.refs.audio));
  }

  handleTimeupdate() {
    this.props.setTime(ReactDOM.findDOMNode(this.refs.audio));
  }

  handlePlayTrack(id) {
    this.props.playTrack(ReactDOM.findDOMNode(this.refs.audio),id);
  }

  handlePlay() {
    this.props.play(ReactDOM.findDOMNode(this.refs.audio));
    var audio = ReactDOM.findDOMNode(this.refs.audio);
    audio.play();
  }

  handlePause() {
    this.props.pause(ReactDOM.findDOMNode(this.refs.audio));
    var audio = ReactDOM.findDOMNode(this.refs.audio);
    audio.pause();
  }

  handleNext() {
    const audio = ReactDOM.findDOMNode(this.refs.audio);
    this.props.next(audio);
  }

  handlePrevious() {
    const audio = ReactDOM.findDOMNode(this.refs.audio);
    this.props.previous(audio);
  }

  handleSetVolume(volume) {
    const audio = ReactDOM.findDOMNode(this.refs.audio);
    audio.volume = volume;
    this.props.setVolume(audio);
  }

  handleProgressBarClick(percent) {
    const audio = ReactDOM.findDOMNode(this.refs.audio);
    audio.currentTime = audio.duration * percent;
    this.props.updatePosition(audio);
  }

  handleEnd() {
    const audio = ReactDOM.findDOMNode(this.refs.audio);
    this.props.next(audio);
  }

  handleStartLoading(){
    if(!this.props.store.isLoading && !R.isNil(this.props.store.playingTrackId)) this.props.setIsLoading(true);
  }

  handleNameUpdate(){
    this.props.setIsLoading(false);
  }

  render() {
    let source;
    const id = this.props.store.playingTrackId;
    if(R.isNil(id)){
      source = '';
    }else{
      source = this.props.store.tracks[id]['url'];

    }

    return (<div styleName="audioplayer">
              <h1>Audioplayer</h1>
                <Audio  ref="audio"
                        autoplay={true}
                        source={source}
                        onTimeupdate={this.handleTimeupdate}
                        onEnded={this.handleEnd}
                        onStartLoading={this.handleStartLoading}
                        onNameUpdate={this.handleNameUpdate} />
                <div styleName="player">
                  <Playingnow tracks={this.props.store.tracks}
                              playingTrackId={this.props.store.playingTrackId}
                              isLoading={this.props.store.isLoading} />
                  <Progressbar  isPlaying={this.props.store.isPlaying}
                                percent={this.props.store.percent}
                                onProgressBar={this.handleProgressBarClick} />
                  <div styleName="track-constrols">
                    <Previous onPrevious={this.handlePrevious}
                              isPlaying={this.props.store.isPlaying} />
                    <PlayPause  onPlay={this.handlePlay}
                                onPause={this.handlePause}
                                onPlayTrack={this.handlePlayTrack}
                                isPlaying={this.props.store.isPlaying}
                                playingTrackId={this.props.store.playingTrackId} />
                    <Next onNext={this.handleNext}
                          isPlaying={this.props.store.isPlaying}/>
                    <Volume isPlaying={this.props.store.isPlaying}
                            volume={this.props.store.volume}
                            onSetVolume={this.handleSetVolume}
                             />       
                  </div>
                </div>
                <Playlist fetching={this.props.store.fetching}
                          fetched={this.props.store.fetched}
                          tracks={this.props.store.tracks}
                          playingTrackId={this.props.store.playingTrackId}
                          startTracksFetch={this.props.startTracksFetch}
                          tracksRecieved={this.props.tracksRecieved}
                          fetchTracksError={this.props.fetchTracksError}
                          onPlayTrack={this.handlePlayTrack}
                          onPlay={this.handlePlay}
                          onPause={this.handlePause}
                          isPlaying={this.props.store.isPlaying}
                          currentTime={this.props.store.currentTime}
                          />
            </div>);

  }
}
Audioplayer.propTypes = {
  tracks: React.PropTypes.array,
  isPlaying : React.PropTypes.bool,
  isLoading : React.PropTypes.bool,
  volume : React.PropTypes.number,
  fetching : React.PropTypes.bool,
  fetched : React.PropTypes.bool,
  playingTrackId : React.PropTypes.number,
  percent:  React.PropTypes.number,
  volume:  React.PropTypes.number,
  duration:  React.PropTypes.number,
  currentTime:  React.PropTypes.number,
  startTracksFetch : React.PropTypes.func,
  tracksRecieved : React.PropTypes.func,
  fetchTracksError : React.PropTypes.func,
  updateVolume: React.PropTypes.func,
  setTime: React.PropTypes.func,
  playTrack: React.PropTypes.func,
  play: React.PropTypes.func,
  pause: React.PropTypes.func,
  next: React.PropTypes.func,
  previous: React.PropTypes.func,
  setVolume: React.PropTypes.func,
  updatePosition: React.PropTypes.func,
  setIsLoading: React.PropTypes.func
}
export default CSSModules(Audioplayer, styles);