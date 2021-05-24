import React from 'react';
import Cell from './Cell';
import PropTypes from 'prop-types';

const Row = props => {
  return (
    <div className="row">
      {props.row.map((cell,index) => <Cell cell = {cell} key={index}/>)}
    </div>
  );
};

Row.propTypes = {
  
};

export default Row;