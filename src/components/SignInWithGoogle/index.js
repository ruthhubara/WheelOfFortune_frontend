import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router'
import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { connect } from 'react-redux';
import { actions } from '../../Store/actions';
// import { gapi } from 'gapi-script';
import logo from './btn_google_signin_dark_normal_web.png';

function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
  };
}

const mapDispatchToProps = (dispatch) => ({
  setUserUid: (userUid) => dispatch(actions.setUserUid(userUid))
})


export default withFirebase(connect(mapStateToProps, mapDispatchToProps)(class SignInWithGoogle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    }
  }

  sign = event => {
    event.preventDefault();
    const { setUserUid } = this.props;
    this.props.firebase
      .doSignInWithGoogle()
      .then((user) => {
        setUserUid(user.uid);
        //here we need to move another compopnent
        this.setState({ redirect: true });
      })
      .catch(error => {
        alert({ error });
      });

  };
  //   componentDidMount() {
  //     gapi.signin2.render('my-signin2', {
  //         'scope': 'profile email',
  //         'width': 200,
  //         'height': 50,
  //         'longtitle': true,
  //         'theme': 'dark',
  //         'onsuccess': this.onSignIn
  //     }); 
  //   }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      console.log("redirect")
      return <Redirect to='/weather' />;
    }
    return (
      // <form onSubmit={this.onSubmit}>
      <div className="google">
        <img src={logo} onClick={this.sign}></img>
        {/* <div id="my-signin2"></div> */}
      </div>
      // </form>
    );
  }
}))
