import React from "react";
import { withRouter } from "react-router-dom";
import { State } from "react-powerplug";
import { auth } from "../../firebase";
import * as routes from "../../constants/routes";
import "../../App.css";

class SignIn extends React.Component {
  handleSubmit = ({ email, password }) => {
    return auth
      .doSignInWithEmailAndPassword(email, password)
      .then((response) => {
        console.log("Successful Sign In", response);
        this.props.history.push(routes.HOME_PATH);
      })
      .catch((err) => {
        console.log("Failed Sign In", err);
        throw err;
      });
  };

  render() {
    return (
      <State initial={{ email: "", password: "", error: null }}>
        {({ state, setState }) => {
          const onEmailChange = (e) => {
            setState({ email: e.target.value });
          };
          const onPasswordChange = (e) => {
            setState({ password: e.target.value });
          };
          const onSubmit = (e) => {
            e.preventDefault();
            this.handleSubmit({
              email: state.email,
              password: state.password,
            }).catch((err) => {
              setState({ error: err.message });
            });
          };

          return (
            <div>
              <form onSubmit={onSubmit}>
                {state.error && <p style={{ color: "red" }}>{state.error}</p>}
                <div>
                  <input
                    type="text"
                    name="email"
                    value={state.email}
                    onChange={onEmailChange}
                    className="App-input Border-round"
                    placeholder="Email or Phone Number"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    name="password"
                    value={state.password}
                    onChange={onPasswordChange}
                    className="App-input Border-round"
                    placeholder="Password Border-round"
                  />
                </div>

                <p className="App-policy">
                  By cliking sign up you agree to our Terms, Data Policy and
                  Cookies Policy.
                </p>
                <button className="Border-round App-button" type="submit">
                  Sign in
                </button>
              </form>
            </div>
          );
        }}
      </State>
    );
  }
}

export default withRouter(SignIn);
