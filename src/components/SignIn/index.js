import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router'
import { SignUpLink } from '../SignUp';
import SignInWithGoogle from '../SignInWithGoogle';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { connect } from 'react-redux';
import { actions } from '../../Store/actions'

function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
  };
}

const mapDispatchToProps = (dispatch) => ({
  setUserEmail: (userEmail) => dispatch(actions.setUserEmail(userEmail)),
  setUserPassword: (userPassword) => dispatch(actions.setUserPassword(userPassword)),
  setUserUid: (userUid) => dispatch(actions.setUserUid(userUid))
})


export default withFirebase(connect(mapStateToProps, mapDispatchToProps)(class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    }
  }

  onSubmit = event => {
    const { email, password } = this.props.user;
    const { setUserUid } = this.props;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then((user) => {
        setUserUid(user.uid);
        console.log(user.uid)
        //here we need to move another compopnent
        this.setState({ redirect: true });
      })
      .catch(error => {
        alert(error);
      });

    event.preventDefault();
  };

  render() {
    const { email, password } = this.props.user;
    const { setUserEmail, setUserPassword } = this.props;
    const isInvalid = password === '' || email === '';
    const { redirect } = this.state;
    if (redirect) {
      console.log("redirect")
      return <Redirect to='/weather' />;
    }
    return (
      // <form onSubmit={this.onSubmit}>
      //   <input
      //     name="email"
      //     value={email}
      //     onChange={(e) => setUserEmail(e.target.value)}
      //     type="text"
      //     placeholder="Email Address"
      //   />
      //   <input
      //     name="password"
      //     value={password}
      //     onChange={(e) => setUserPassword(e.target.value)}
      //     type="password"
      //     placeholder="Password"
      //   />
      //   <button disabled={isInvalid} type="submit">
      //     Sign In
      //   </button>
      //   <SignUpLink />
      // </form>
      <div className="outer">
        <div className="inner">
          <form onSubmit={this.onSubmit}>

            <h3>Sign In</h3>

            <div className="form-group">
              <label>Email</label>
              <input type="email" className="form-control" placeholder="Enter email" onLoad={(e) => setUserEmail(e.target.value)} onChange={(e) => setUserEmail(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" placeholder="Enter password" onLoad={(e) => setUserEmail(e.target.value)} onChange={(e) => setUserPassword(e.target.value)}
              />
            </div>
            <button disabled={isInvalid} type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
            <SignUpLink />
            <SignInWithGoogle></SignInWithGoogle>
          </form>
        </div>
      </div>

    );
  }
}))
