import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import { Route, Switch, withRouter, BrowserRouter, Redirect } from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import { initializeApp } from "./redux/appReducer";
import { connect, Provider } from "react-redux";
import { compose } from "redux";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/reduxStore";
import { withSuspense } from "./hoc/withSuspense";
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const LoginPage = React.lazy(() => import('./components/Login/Login'));

class App extends React.Component {
  catchAllUnhandledErrors = (reason, promise) => {
    alert('Some error occured');
  }
  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
  }
  componentWillUnmount(){
    window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          <Switch>
          <Route exact path='/' render={() => <Redirect to={'/profile'} />} />
            <Route
              path="/profile/:userId?"
              render={() => <ProfileContainer />}
            />
            <Route path="/dialogs" render={withSuspense(DialogsContainer)} />
            <Route path="/news" component={News} />
            <Route path="/music" component={Music} />
            <Route path="/settings" component={Settings} />
            <Route path="/users" render={() => <UsersContainer pageTitle={"Самураи"} />} />
            <Route path="/login" render={withSuspense(LoginPage)} />
            <Route path="*" render={<div>Not Found</div>} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
});

let AppContainer =  compose(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);

let MainApp = (props) => {
  return (
    <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
  );
}

export default MainApp;