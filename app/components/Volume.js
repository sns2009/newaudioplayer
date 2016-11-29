import React from 'react';
import CSSModules from 'react-css-modules';
import styles from '../../css/style.css';

class Volume extends React.Component {

  constructor(){
    super();
    this.changeVolume = this.changeVolume.bind(this);
  }


  changeVolume(e){
    let volume = +((e.pageX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.getBoundingClientRect().width);
    if(this.props.isPlaying) this.props.setVolume(volume,e.currentTarget.getBoundingClientRect().width);
  
  }

  render() {
    const barWidth = this.props.volume * this.props.volumeBarWidth;
    const volumeBarStyle = {width: barWidth, height:'100%', backgroundColor: 'black'};
    return (<div styleName="volume">
              <div styleName="speaker-high"></div>
              <div onClick={this.changeVolume} styleName="volume-bar">
                <div style={volumeBarStyle}></div>
              </div>
            </div>)
  }
}
Volume.propTypes = {
  isPlaying : React.PropTypes.bool,
  volume : React.PropTypes.number,
  volumeBarWidth : React.PropTypes.number,   
  setVolume : React.PropTypes.func
}
export default CSSModules(Volume, styles);
