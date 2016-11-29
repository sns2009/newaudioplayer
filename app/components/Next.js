import React from 'react';
import CSSModules from 'react-css-modules';
import styles from '../../css/style.css';

class Next extends React.Component {

  constructor() {
    super();
    this.nextClick = this.nextClick.bind(this);
  }

  nextClick(e) {
    e.preventDefault();
    if (this.props.isPlaying) {
      this.props.next();
    }
  }

  render() {
    return (<div onClick={this.nextClick} styleName="next" />);
  }
}
Next.propTypes = {
  isPlaying : React.PropTypes.bool,
  next : React.PropTypes.func
}
export default CSSModules(Next, styles);
