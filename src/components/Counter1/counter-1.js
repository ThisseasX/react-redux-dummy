import React from 'react';
import { getRandomColor } from '/utils';
import { connect } from '/react-redux';

const Counter1 = ({ counter1 }) => (
  <p style={{ backgroundColor: getRandomColor() }}>{counter1}</p>
);

const mapStateToProps = ({ counter1 }) => ({
  counter1,
});

export default connect(mapStateToProps)(Counter1);
