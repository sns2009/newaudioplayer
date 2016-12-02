import React from 'react';
import ReactDOM from 'react-dom';
import R from 'ramda';

class Audio extends React.Component {

    constructor(props) {
      super(props);
      this.addListener = this.addListener.bind(this);
    this.removeAllListeners = this.removeAllListeners.bind(this);
      this.state = {
          listeners: []
      };
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

    render() {
      return(<audio ref="audio"
                    preload={this.props.preload}
                    volume={this.props.volume}
                    controls={false}
                    crossOrigin="anonymous"
                    autoPlay={true}
                    loop={this.props.loop}
                    src={this.props.source} />)
    }
}
Audio.propTypes = {
  autoplay: React.PropTypes.bool,
  source: React.PropTypes.string,
  volume: React.PropTypes.number,
  onTimeupdate: React.PropTypes.func,
  onEnded: React.PropTypes.func,
  onStartLoading: React.PropTypes.func,
  onNameUpdate: React.PropTypes.func
};

export default Audio;
