import React from 'react';
import ReactDOM from 'react-dom';
import R from 'ramda';

class Audio extends React.Component {


    constructor(props) {
      super(props);
      this.addListener = this.addListener.bind(this);
      this.removeAllListeners = this.removeAllListeners.bind(this);
      this.togglePlay = this.togglePlay.bind(this);
      this.setPlaybackPercent = this.setPlaybackPercent.bind(this);
      this.changeCurrentTimeBy = this.changeCurrentTimeBy.bind(this);
      this.setVolume = this.setVolume.bind(this);
      this.state = {
          listeners: []
      };
    }

    get audio() {
        if (!this.refs)
            return {};

        return ReactDOM.findDOMNode(this.refs.audio);
    }


    addListener(event, func){ 
        var audio = ReactDOM.findDOMNode(this.refs.audio);
        audio.addEventListener(event, func);
        this.state.listeners.push({event: event, func: func});
    }

    removeAllListeners(){ 
        var audio = ReactDOM.findDOMNode(this.refs.audio);
        R.forEach((obj) =>{
          audio.removeEventListener(obj.event, obj.func);
        },this.state.listeners);
        this.state.listeners = [];
    }

    componentDidMount() {
        this.addListener('timeupdate', this.props.onTimeupdate);
        this.addListener('ended', this.props.onEnded);
        this.addListener('loadstart', this.props.onStartLoading);
        this.addListener('loadedmetadata', this.props.onNameUpdate);
    }

    componentWillUnmount() {
        this.removeAllListeners();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.autoplay === true && this.props.autoplay === false) {
            this.audio.play();
        }
    }

    togglePlay(){
        if (this.audio.paused)
            this.audio.play();
        else
            this.audio.pause();
    }

    setPlaybackPercent(percent) { 
        this.audio.currentTime = percent * this.audio.duration;
    }

    changeCurrentTimeBy(amount) { 
        this.audio.currentTime += amount;
    }

    setVolume(percent) {
        this.audio.volume = percent;
    }

    render() {

        return(
            <audio
                ref="audio"
                preload={this.props.preload}
                volume={this.props.volume}
                controls={false}
                crossOrigin="anonymous"
                autoPlay={true}
                loop={this.props.loop}
                src={this.props.source} />
        )
    }

}

Audio.defaultProps = {
        autoplay: true,
        preload: true,
        source: "",
        loop: false,
        volume: .8,
        onTimeupdate: null,
        onError: null,
        onProgress: null,
        onEnded: null
    };

Audio.propTypes = {
        autoplay: React.PropTypes.bool,
        preload: React.PropTypes.bool,
        source: React.PropTypes.string,
        loop: React.PropTypes.bool,
        volume: React.PropTypes.number,
        onTimeupdate: React.PropTypes.func,
        onError: React.PropTypes.func,
        onProgress: React.PropTypes.func,
        onEnded: React.PropTypes.func
    };

export default Audio;
