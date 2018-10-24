Create GraphQL API

Create folder 'react-appsync'
`npx create-react-app .`
`amplify init`
`npm i aws-amplify aws-amplify-react`
Create API w/ `amplify add api`

Select 'GraphQL', default name, 'API Key', No, No, true (to Guided Schema creation), yes (to edit), make changes (when you see the schema) and then hit enter

Note: To go through the setup again if you made the wrong choices, just run `amplify remove api`

To push to the cloud, run `amplify push` then we'll tell it to generate code for us

When it's done successfully, you'll get a GQL endpoint / API key
aws-exports.js contains the API Key and other credentials
If we go to the graphql folder, we can see all of our generated code (schema, queries, mutations, subscriptions)

Configure your app in index.js

```
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);
```

Note: If we want to modify our schema in the future, all we have to do is make changes to this schema.graphql file, run `amplify push` again, it will tell us the Operation that we are trying to perform ("update" in this case, since we've already created it) and we'll go ahead and do it

To manually run our first query, we'll go to the AppSync dashboard: https://console.aws.amazon.com/appsync/home and click on our API
Here we can manually create our schema and run queries

We'll run our first query after creating (and maybe verifying our schema--the Blog choice w/ the added field 'content'):

```
mutation createBlog {
  createBlog(input: {
    name: "My Programming Blog"
  }) {
    id
    name
  }
}
```

And should get this returned:

```
{
  "data": {
    "createBlog": {
      "id": "5011da8f-e498-4dc7-aabd-54ce7ac3bc55",
      "name": "My Programming Blog"
    }
  }
}
```

Next, we’ll create a new post in this blog (replace the postBlogId with the id returned from the above mutation):

```
mutation createPost {
  createPost(input: {
    title: "Hello World from my programming blog"
    content: "Welcome to my blog!"
    postBlogId: "5011da8f-e498-4dc7-aabd-54ce7ac3bc55"
  }) {
    id
    title
  }
}
```

And this returned:

```
{
  "data": {
    "createPost": {
      "id": "88441570-fcfa-441d-9d09-de7af214cc3b",
      "title": "Hello World from my programming blog"
    }
  }
}
```

Now, let’s create a comment for this post (replace commentPostId with the ID returned from the above mutation):

```
mutation createComment {
  createComment(input: {
    content: "This post is terrible"
    commentPostId: "88441570-fcfa-441d-9d09-de7af214cc3b"
  }) {
    id
  }
}
```

And returns:

```
{
  "data": {
    "createComment": {
      "id": "7e84f915-a602-4607-a842-34222cd7c734"
    }
  }
}
```

Finally, we want to write a query to get all of the data in the blog. But how do we do that? If we take a look at the Docs, we can listBlogs, and if we go through the right steps, we can list all of the blogs and their data like so:

```
{
  listBlogs {
    items {
      id
      name
      posts {
        items {
          id
          title
          content
        }
      }
    }
  }
}
```

If we get the id of the blog that's returned, we can get all of the blog data by id:

```
{
  getBlog(id: "5011da8f-e498-4dc7-aabd-54ce7ac3bc55") {
   	id
    name
    posts {
      items {
        id
        title
        content
      }
    }
  }
}
```

Now to query our blog data:

```
import API, { graphqlOperation } from "@aws-amplify/api";
import { listBlogs } from "../graphql/queries";
...
componentDidMount() {
    this.getBlogs();
  }

  getBlogs = async () => {
    const blogs = await API.graphql(graphqlOperation(listBlogs));
    console.log("blog successfully fetched", blogs);
    this.setState({ blogs });
  };
```

Or to get one blog:

```
state = {
    blog: []
  };

  componentDidMount() {
    this.getBlog();
  }

  getBlog = async () => {
    const blog = await API.graphql(graphqlOperation(getBlog, { id: "5011da8f-e498-4dc7-aabd-54ce7ac3bc55" }));
    console.log("blog successfully fetched", blog);
    this.setState({ blog });
  };
```

Implementing User Permissions (for CRUD Operations) and Elastic Search:

https://medium.com/open-graphql/create-a-multiuser-graphql-crud-l-app-in-10-minutes-with-the-new-aws-amplify-cli-and-in-a-few-73aef3d49545

Create Cognito Auth

`amplify add auth`
Yes, default config

To add auth immediately, use the 'withAuthenticator' HOC:

```
import { withAuthenticator } from "aws-amplify-react";

...
export default withAuthenticator(Home);
```

When we sign in, we can head to the Cognito console and see their data as well as delete users

Create Analytics with Pinpoint

`amplify add analytics`
Ask if we want unauth users to send analytics events
Overwrite - Y

To record a simple event with the auth user (using withAuthenticator):

```
import Analytics from "@aws-amplify/analytics";

state = {
  user: null
};

componentDidMount() {
  this.getCurrentAuthUser();
}

getCurrentAuthUser = async () => {
  const user = await Auth.currentAuthenticatedUser();
  console.log({ currentUser: user });
  this.setState({ user: user.username });
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
```
