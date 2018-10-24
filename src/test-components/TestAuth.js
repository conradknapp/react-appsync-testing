import React from "react";

class TestAuth extends React.Component {
  state = {
    username: "",
    password: "",
    email: "",
    phone_number: "",
    authCode: ""
  };

  // 2. onChange handler for user input changes
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // 3. Function to call Auth.signUp
  handleSignUp = async () => {
    const { username, password, email, phone_number } = this.state;
    await Auth.signUp({
      username,
      password,
      attributes: { phone_number, email }
    });
    console.log("successfully signed up");
  };

  // 4. Function to call Auth.signUp
  confirmSignUp = async () => {
    const { username, authCode } = this.state;
    await Auth.confirmSignUp(username, authCode);
    console.log("successfully confirmed signed up");
  };

  render() {
    return (
      <div>
        {/* // 5. In render method, create inputs with attributes to update state */}
        <input onChange={this.handleChange} name="username" />

        {/* // 6. Create buttons to call signUp and confirmSignUp methods */}
        <button onClick={this.handleSignUp}>Sign Up</button>
      </div>
    );
  }
}

export default TestAuth;
