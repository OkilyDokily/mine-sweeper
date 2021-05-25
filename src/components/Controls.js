import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { resetGrid, addSecond } from '../ActionTypes/Actions'
import { flatten } from 'lodash'
import { render } from '@testing-library/react';




class Controls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cancel: null,
      seconds: 0
    }
  }

  restart = () => {
    const { dispatch } = this.props;
    if (this.state.cancel !== null) {
      clearInterval(this.state.cancel);
      this.setState({seconds:0})
    }

    const callSeconds = () => {
      this.setState({ seconds: this.state.seconds + 1 })
    }

    let cancel = setInterval(function () {
      callSeconds();
    }, 1000)
    this.setState({ cancel: cancel })
    dispatch(resetGrid(document.getElementById("width").value, document.getElementById("height").value))
  }
  render() {
    return (
      <div>
        <p>Mines left: {this.props.mines}</p>
        <p>Seconds played: {this.state.seconds}</p>
        <p>{(this.props.hasWon !== null) ? (this.props.hasWon ? "You won" : "You lost") : null}</p>
        <button onClick={this.restart} id="restart">Restart Game</button>
        <input id="width" type="number" placeholder="width" />
        <input id="height" type="number" placeholder="height" />
        <input id="mines" type="number" placeholder="mines" />
      </div>
    );
  }

};

Controls.propTypes = {

};

const mapStateToProps = (state) => {
  return {
    hasWon: state.playerWins,
    mines: flatten(state.grid).filter(cell => cell.isMine).length - flatten(state.grid).filter(cell => cell.isFlagged).length,
  }
}

export default connect(mapStateToProps)(Controls);