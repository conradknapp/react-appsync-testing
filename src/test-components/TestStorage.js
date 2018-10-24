import React from "react";
import { Storage } from "aws-amplify";

class TestStorage extends React.Component {
  // create function to work with Storage
  addToStorage = () => {
    Storage.put("javascript/test.js", `console.log("Hello World")`)
      .then(result => {
        console.log({ result });
      })
      .catch(err => console.error(err));
  };

  // If we want to read everything from this folder, we can use Storage.list:

  //   readFromStorage = () => {
  //   Storage.list('javascript/')
  //     .then(data => console.log('data from S3: ', data))
  //     .catch(err => console.log('error'))
  // }

  // If we only want to read the single file, we can use Storage.get:

  // readFromStorage = () => {
  //   Storage.get('javascript/MyReactComponent.js')
  //     .then(data => console.log('data from S3: ', data))
  //     .catch(err => console.log('error'))
  // }

  // If we wanted to pull down everything, we could use Storage.list:

  readFromStorage = () => {
    Storage.list("")
      .then(data => console.log("data from S3: ", data))
      .catch(err => console.log("error"));
  };

  render() {
    return (
      // add click handler
      <button onClick={this.addToStorage}>Add To Storage</button>
    );
  }
}

export default TestStorage;
