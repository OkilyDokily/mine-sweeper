import React from 'react';
import PropTypes from 'prop-types';
import Row from './Row';
import {connect} from 'react-redux';

const MinesweeperField = props => {
  return (
    <div id="minesweeper">
      {props.grid.map((row,index) => {
        return <Row row = {row} key={index}/>
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    grid: state.grid
  }
}

MinesweeperField.propTypes = {
  
};
export default connect(mapStateToProps)(MinesweeperField);
