import { incrementCounter1, incrementCounter2 } from './actions';

const initialState = { counter1: 0, counter2: 0 };

const reducer = (state = initialState, { type }) => {
  switch (type) {
    case incrementCounter1().type: {
      return { ...state, counter1: state.counter1 + 1 };
    }
    case incrementCounter2().type: {
      return { ...state, counter2: state.counter2 + 1 };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
