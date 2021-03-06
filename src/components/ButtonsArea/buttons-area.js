import React from 'react';
import { incrementCounter1, incrementCounter2 } from '/state';
import { getRandomColor } from '/utils';
import { connect } from '/react-redux';

const ButtonsArea = ({ incrementCounter1, incrementCounter2 }) => (
  <div style={{ backgroundColor: getRandomColor() }}>
    <button onClick={incrementCounter1}>Increment Counter1</button>
    <button onClick={incrementCounter2}>Increment Counter2</button>
  </div>
);

const mapDispatchToProps = dispatch => ({
  incrementCounter1: () => dispatch(incrementCounter1()),
  incrementCounter2: () => dispatch(incrementCounter2()),
});

export default connect(null, mapDispatchToProps)(ButtonsArea);
