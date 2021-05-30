import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, render } from 'enzyme/build';
import App from '../App';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import SignIn from '../views/user/signIn/SignIn';
import { Provider } from 'react-redux';
import { authReducer } from '../store/auth/reducer';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';

const rootReducer = combineReducers({
  auth: authReducer,
});

const ReduxProvider = ({ children, reduxStore }) => <Provider store={reduxStore}>{children}</Provider>;

configure({ adapter: new Adapter() });
const mockStore = applyMiddleware()(createStore);

describe('App', () => {
  it('mounts without crashing', () => {
    <ReduxProvider reduxStore={mockStore}>
      <App />
    </ReduxProvider>;

    // test('Sign', () => {
    //   expect(children.find('sign_in').length).toBe(1);
    // });
  });
});

describe('SignIn', () => {
  it('mounts without crashing', () => {
    const wrapper = shallow(
      <ReduxProvider>
        <SignIn />
      </ReduxProvider>,
    );

    wrapper.unmount();
  });
});

test('redirects to login page', () => {
  const history = createMemoryHistory();
  render(
    <ReduxProvider reduxStore={mockStore(rootReducer)}>
      <Router history={history}>
        <App signedInUser={null}>
          <Route exact path="/sign-in" name="Sign In User" render={(props) => <SignIn {...props} />} />
        </App>
      </Router>
    </ReduxProvider>,
  );
  expect(history.location.pathname).toBe('/');
});
