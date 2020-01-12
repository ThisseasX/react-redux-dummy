import React, { createContext, useState, useEffect } from 'react';

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

      const hasChanges = Object.entries(state).some(
        ([key, value]) => {
          console.log(`Key: ${key}, Value: ${value}, newValue: ${newState[key]}`);

          return value !== newState[key]
        },
      );

      if (hasChanges) {
        setState(newState);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

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
