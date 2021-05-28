import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {startGame, revealCellCount,applyFlag} from '../ActionTypes/Actions'
import flag from '../images/flag.svg'
import bomb from '../images/bomb.svg'


const Cell = props => {
  const handleClick = (e) => {
    e.preventDefault();
    const {dispatch} = props;
    if(!props.isTimerOn){
      dispatch(startGame(props.cell,document.getElementById("mines").value))
    }
    dispatch(revealCellCount(props.cell))
  }
  const rightClick = (e) => {
    e.preventDefault();
    const { dispatch } = props;
    if (!props.isTimerOn) {
      dispatch(startGame(props.cell, document.getElementById("mines").value))
    }
    dispatch(applyFlag(props.cell))
  }
  const classValue = "cell cell-" + props.cell.flagNumber + (props.cell.revealed ? " revealed" : "");
  return (
    <div onClick={handleClick} className={classValue}  onContextMenu={rightClick}>
     
      {props.cell.isFlagged ? <img src={flag} height="15px" width="15px" alt="flag" /> : (props.cell.revealed ? (props.cell.isMine ? <img src={bomb} height="15px" width="15px" alt="flag" /> : (props.cell.flagNumber > 0) ? props.cell.flagNumber : null ) : null)}

    </div>
  );
};

const mapStateToProps = (state) => {
  return  {
    isTimerOn: state.timerIsOn
  }
}

Cell.propTypes = {

};

export default connect(mapStateToProps)(Cell);