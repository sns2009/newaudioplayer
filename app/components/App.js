import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import Audioplayer from './Audioplayer';

function mapStateToProps(state) {
  return {
    store: state.Playerlogic,

  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(Audioplayer);

export default App;
