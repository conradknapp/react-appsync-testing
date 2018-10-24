import React from "react";
import API, { graphqlOperation } from "@aws-amplify/api";
import { getBlog } from "../graphql/queries";
import { withAuthenticator } from "aws-amplify-react";
import Analytics from "@aws-amplify/analytics";
import { Auth } from "aws-amplify";

class Home extends React.Component {
  state = {
    blog: [],
    user: null
  };

  componentDidMount() {
    this.getBlog();
    this.getCurrentAuthUser();
  }

  getCurrentAuthUser = async () => {
    const user = await Auth.currentAuthenticatedUser();
    console.log({ currentUser: user });
    this.setState({ user: user.username });
  };

  getBlog = async () => {
    const blog = await API.graphql(
      graphqlOperation(getBlog, { id: "5011da8f-e498-4dc7-aabd-54ce7ac3bc55" })
    );
    console.log("blog successfully fetched", blog);
    this.setState({ blog });
  };

  recordEvent = () => {
    Analytics.record({
      name: "Test Event 1",
      attributes: {
        user: this.state.user
      }
    });
    console.log(`analytics data from ${this.state.user} sent!`);
  };

  render() {
    return (
      <div>
        hi
        <button onClick={this.recordEvent}>Click to send analytics data</button>
      </div>
    );
  }
}

export default withAuthenticator(Home);
