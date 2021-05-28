import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { resetGrid } from '../ActionTypes/Actions'
import { flatten } from 'lodash'


class Controls extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      cancel: null,
      seconds: 0,
      mines: null
    }
    this.inputRef = React.createRef();
  }

  restart = () => {
    const { dispatch } = this.props;
    this.setState({ seconds: 0 })
    if (this.state.cancel !== null) {
      clearInterval(this.state.cancel);
    }
    const x = document.getElementById("width").value;
    const y = document.getElementById("height").value;
    dispatch(resetGrid(x, y));
  }

  componentDidMount(){
    this.setState({mines: this.inputRef.current.value}); 
  }

  updateMines = () => {
    this.rerenderGrid();
    this.setState({ mines: this.inputRef.current.value });
  }

  componentDidUpdate(prevProps, prevState) {

    if (prevProps.timerIsOn !== this.props.timerIsOn) {
      if (!this.props.timerIsOn && this.state.cancel !== null) {

        clearInterval(this.state.cancel);
        this.setState({ cancel: null })
      }

      if (this.props.timerIsOn && this.state.cancel === null) {
        const callSeconds = () => {
          this.setState({ seconds: this.state.seconds + 1 })
        }

        let cancel = setInterval(function () {
          callSeconds();
        }, 1000)

        this.setState({ cancel: cancel })
      }
    }

  }

  rerenderGrid = () => {
    const { dispatch } = this.props;
    this.setState({ seconds: 0 })
    if (this.state.cancel !== null) {
      clearInterval(this.state.cancel);
    }
    const x = document.getElementById("width").value;
    const y = document.getElementById("height").value;
    dispatch(resetGrid(x, y));
  }

  render() {


    return (
      <div id="controls">
        <p id="displaymines" >Mines left: {(this.props.hasWon === null && !this.props.timerIsOn) ? this.state.mines : this.props.mines}</p>
        <p>Seconds played: {this.state.seconds}</p>
        <p>{(this.props.hasWon !== null) ? (this.props.hasWon ? "You won" : "You lost") : null}</p>
        <button onClick={this.restart} id="restart">Reset Grid</button>
        <div className="inputdiv width">
          <label>width: </label>
          <input id="width" type="number" onChange={this.rerenderGrid} defaultValue="10" min="5" placeholder="width" />
        </div>

        <div className="inputdiv height">
          <label>height:</label>
          <input id="height" type="number" onChange={this.rerenderGrid} defaultValue="10" min="5" placeholder="height" />
        </div>
        <div className="inputdiv mines">
          <label>mines:</label>
          <input id="mines" onChange={this.updateMines} type="number" defaultValue="10" min="5" placeholder="mines" ref={this.inputRef} />
        </div>
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
    timerIsOn: state.timerIsOn
  }
}

export default connect(mapStateToProps)(Controls);