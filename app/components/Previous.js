import React from 'react';
import CSSModules from 'react-css-modules';
import styles from '../../css/style.css';

class Previous extends React.Component {

  constructor() {
    super();
    this.previousClick = this.previousClick.bind(this);
  }

  previousClick(e) {
    e.preventDefault();
    this.props.onPrevious();
  }

  render() {
    return (<div onClick={this.previousClick} styleName="previous" />);
  }
}
Previous.propTypes = {
  isPlaying : React.PropTypes.bool,
  onPrevious : React.PropTypes.func
}
export default CSSModules(Previous, styles);
