import React from 'react';
import R from 'ramda';
import playerParams from '../playerParams';
import CSSModules from 'react-css-modules';
import styles from '../../css/style.css';

class Playingnow extends React.Component {

  constructor() {
    super();
    this.updateName = this.updateName.bind(this);
  }


  updateName(artist,track) {
    let artistTrack = `${artist} - ${track}`;
    if (artistTrack.length > playerParams.trackLettersInPlayingnow){
      return artistTrack.substr(0, playerParams.trackLettersInPlayingnow - 2).concat(' ...');
    }else{
      return artistTrack;
    }
  }

  render() {

    let artistTrack = 'Artist - Track';

    if(this.props.isLoading) artistTrack = "Loading...";

    if(!this.props.isLoading && !R.isNil(this.props.playingTrackId)){
      artistTrack = this.updateName(this.props.tracks[this.props.playingTrackId].artist,this.props.tracks[this.props.playingTrackId].track);
    }

    return (<div styleName="playingnow">
              {artistTrack}
            </div>);
  }
}
Playingnow.propTypes = {
  playingTrackId : React.PropTypes.number,
}
export default CSSModules(Playingnow, styles);
