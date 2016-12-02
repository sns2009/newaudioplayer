import React from 'react';
import R from 'ramda';
import CSSModules from 'react-css-modules';
import styles from '../../css/style.css';


class Progressbar extends React.Component {

  constructor() {
    super();
    this.progressbarWidth = 0;
    this.timelineClick = this.timelineClick.bind(this);
  }

  componentDidUpdate(){
    this.progressbarWidth = this.progressbar.getBoundingClientRect().width;
  }

  timelineClick(e) {
    if(this.props.isPlaying) {
      const newTimelineWidth = +(e.pageX - e.currentTarget.getBoundingClientRect().left);
      const percent = newTimelineWidth / this.progressbarWidth;
      this.props.onProgressBar(percent); 
    }
  }

  render() {

    const progressbarWidth = this.progressbarWidth || 0;
    const timelineWidth = progressbarWidth * this.props.percent;
    const timeline = { height: '100%',
      width: `${timelineWidth}px`,
      backgroundColor: 'black' };
      
    return (<div onClick={this.timelineClick} ref={(elem) => { this.progressbar = elem; }}
                 styleName="progressbar">
                <div style={timeline} />
          </div>);
  }
}
Progressbar.propTypes = {
  isPlaying : React.PropTypes.bool,
  percent:  React.PropTypes.number,
  onProgressBar: React.PropTypes.func
}
export default CSSModules(Progressbar, styles);
