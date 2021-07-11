import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout-component';

import Header from './components/header/header.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

class App extends React.Component
{
  /*constructor()
  {
    super();

    this.state = {
      currentUser: null
    }
  }*/

  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.props.setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            });
          });

        setCurrentUser(userAuth);

        /*userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });

          console.log(this.state);
        });*/
      }

      this.setState({currentUser: userAuth});
    });
  }

  /*componentDidMount() {
    this.unsubcribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapShot(snapShot => {
          //console.log(snapShot);

          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          }, () => {
            console.log(this.state);
          })
        });
        
        //console.log(this.state);
      }

      this.setState({currentUser: userAuth});
    });
  }*/

  /*componentDidMount() {
    this.unsubcribeFromAuth = auth.onAuthStateChanged(async user => {
      //this.setState({currentUser: user});

      createUserProfileDocument(user);

      //console.log(user);
    });
  }*/

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  /*componentDidMount() {
    auth.onAuthStateChanged(user => {
      this.setState({currentUser: user});

      console.log(user);
    });
  }*/

  render() {
    return (
      <div>
        <Header  />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route
            exact
            path='/signin'
            render={() => 
            this.props.currentUser ? (
            <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }

  /*render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }*/
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

/*const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})*/

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App);
