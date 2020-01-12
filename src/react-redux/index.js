import React, { createContext } from 'react';

const StoreContext = createContext();

const Provider = ({ store, children }) => (
  <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
);

const noop = () => ({});

const Connect = Component =>
  class ConnectedComponent extends React.Component {
    constructor({ store, mapStateToProps, mapDispatchToProps }) {
      super();

      mapStateToProps = mapStateToProps || noop;
      mapDispatchToProps = mapDispatchToProps || noop;

      const stateProps = mapStateToProps(store.getState());
      this.actionProps = mapDispatchToProps(store.dispatch);

      this.state = { ...stateProps };

      this.unsubscribe = store.subscribe(() => {
        const newState = store.getState();
        const targetState = {};

        const hasChanges = Object.entries(this.state).some(([key, value]) => {
          console.log(
            `Name: ${Component.name}, Key: ${key}, Value: ${value}, newValue: ${newState[key]}`,
          );

          targetState[key] = newState[key];

          return value !== newState[key];
        });

        console.log(`Name: ${Component.name}, HasChanges: ${hasChanges}`);

        if (hasChanges) {
          this.setState({ ...targetState });
        }
      });
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    render() {
      return <Component {...this.state} {...this.actionProps} />;
    }
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
