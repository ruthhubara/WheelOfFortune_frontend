import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { actions } from '../../Store/actions'
import { Redirect, withRouter } from 'react-router'


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

export default withRouter(withFirebase(connect(mapStateToProps, mapDispatchToProps)(class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      passwordTwo: ''
    }
  }

  onSubmit = event => {
    const { email, password } = this.props.user;
    const { setUserUid } = this.props;
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        console.log(authUser.user.uid);
        setUserUid(authUser.user.uid);
        this.setState({ redirect: true })
      })
      .catch(error => {
        alert(error);
      });

    event.preventDefault();
  }


  render() {
    const { email, password } = this.props.user;
    const { passwordTwo } = this.state;
    const { setUserEmail, setUserPassword } = this.props;
    const isInvalid =
      password !== passwordTwo ||
      password === '' ||
      email === '';
    const { redirect } = this.state;
    if (redirect) {
      console.log("redirect")
      return <Redirect to='/search' />

    }
    return (
      //       <form onSubmit={this.onSubmit}>
      //  <input
      //           name="username"
      //           value={username}
      //           onChange={this.onChange}
      //           type="text"
      //           placeholder="Full Name"
      //         />
      //         <input
      //           name="email"
      //           value={email}
      //           onChange={this.onChange}
      //           type="text"
      //           placeholder="Email Address"
      //         />
      //         <input
      //           name="passwordOne"
      //           value={passwordOne}
      //           onChange={this.onChange}
      //           type="password"
      //           placeholder="Password"
      //         />
      //         <input
      //           name="passwordTwo"
      //           value={passwordTwo}
      //           onChange={this.onChange}
      //           type="password"
      //           placeholder="Confirm Password"
      //         />
      // <button disabled={isInvalid} type="submit">
      //           Sign Up
      //         </button> 
      //         {error && <p>{error.message}</p>}
      //       </form>
      <div className="outer" >
        <div className="inner">
          <form onSubmit={this.onSubmit}>
            <h3>Sign Up</h3>

            <div className="form-group">
              <label>Email</label>
              <input type="email" className="form-control" placeholder="Enter email" onChange={(e) => setUserEmail(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" placeholder="Enter password" onChange={(e) => setUserPassword(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" className="form-control" placeholder="Enter password" onChange={(e) => this.setState({ passwordTwo: e.target.value })} />
            </div>

            <button disabled={isInvalid} type="submit" className="btn btn-dark btn-lg btn-block">Sign Up</button>
            <p className="forgot-password text-right">
              Already registered <Link to={ROUTES.SIGN_IN}>Sign In</Link>
            </p>
          </form>
        </div>
      </div>

    );
  }
}
)))
const SignUpLink = () => (
  <p className="forgot-password text-right">
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);
// const SignUpForm = withFirebase(SignUpFormBase);


export { SignUpLink };