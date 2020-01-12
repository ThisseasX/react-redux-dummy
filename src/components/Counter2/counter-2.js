import React from 'react';
import { getRandomColor } from '/utils';
import { connect } from '/react-redux';

const Counter2 = ({ counter2 }) => (
  <>
    <p style={{ backgroundColor: getRandomColor() }}>{counter2}</p>
  </>
);

const mapStateToProps = ({ counter2 }) => ({
  counter2,
});

export default connect(mapStateToProps)(Counter2);
