import React from "react";
import { Storage } from "aws-amplify";

class TestImageUpload extends React.Component {
  // In the above code, we link a file upload form input to the onChange event handler. When the user supplies a file, Storage.put is called to upload the file to S3 with MIME type image/png.

  handleChange(event) {
    const file = e.target.files[0];
    Storage.put("example.png", file, {
      contentType: "image/png"
    })
      .then(result => console.log(result))
      .catch(err => console.log(err));
    }

  render() {
    return (
      <input type="file" accept="image/png" onChange={event => this.handleChange(event)} />
    );
  }
}

export default TestImageUpload;
