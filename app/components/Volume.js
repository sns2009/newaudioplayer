import React from 'react';
import CSSModules from 'react-css-modules';
import styles from '../../css/style.css';

class Volume extends React.Component {

  constructor(){
    super();
    this.volumeBarWidth = 0;
    this.changeVolume = this.changeVolume.bind(this);
  }

  componentDidUpdate(){
     this.volumeBarWidth = this.volumeBar.getBoundingClientRect().width;
  }

  changeVolume(e){
    let volume = +((e.pageX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.getBoundingClientRect().width);
    this.props.onSetVolume(volume);
  }

  render() {
    const barWidth = this.props.volume * this.volumeBarWidth;
    const volumeBarStyle = {width: `${barWidth}px`, height:'100%', backgroundColor: 'black'};

    let speaker;
    if(this.props.volume < 0.5){
      speaker = 'speaker-medium';
    } else {
      speaker = 'speaker-high';
    }
    return (<div styleName="volume">
              <div styleName={speaker}></div>
              <div onClick={this.changeVolume}  ref={(elem) => { this.volumeBar = elem; }} styleName="volume-bar" >
                <div style={volumeBarStyle}></div>
              </div>
            </div>)
  }
}
Volume.propTypes = {
  isPlaying : React.PropTypes.bool,
  volume : React.PropTypes.number,   
  onSetVolume : React.PropTypes.func
}
export default CSSModules(Volume, styles);
