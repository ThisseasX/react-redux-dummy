import React, { createContext, useState, useEffect } from 'react';
import { pick, shallowCompare } from '/utils';

const StoreContext = createContext();

const Provider = ({ store, children }) => (
  <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
);

const noop = () => ({});

const Connect = Component => ({ store, mapStateToProps, mapDispatchToProps }) => {
  mapStateToProps = mapStateToProps || noop;
  mapDispatchToProps = mapDispatchToProps || noop;

  const stateProps = mapStateToProps(store.getState());
  const actionProps = mapDispatchToProps(store.dispatch);

  const [state, setState] = useState(stateProps);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const newState = store.getState();
      const subscribedFields = Object.keys(state);
      const subscribedState = pick(subscribedFields, newState);

      const isIdentical = shallowCompare(state, subscribedState);

      if (!isIdentical) {
        setState(subscribedState);
      }
    });

    return unsubscribe;
  });

  return <Component {...state} {...actionProps} />;
};

const connect = (mapStateToProps, mapDispatchToProps) => Component => {
  const ConnectedComponent = Connect(Component);

  return () => (
    <StoreContext.Consumer>
      {value => (
        <ConnectedComponent
          store={value}
          mapStateToProps={mapStateToProps}
          mapDispatchToProps={mapDispatchToProps}
        />
      )}
    </StoreContext.Consumer>
  );
};

export { Provider, connect };
