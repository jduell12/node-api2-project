import React, { useState } from "react";
import { Switch, Route, useHistory, Link } from "react-router-dom";

//components
import Posts from "./components/Posts";

function App() {
  const history = useHistory();

  const [postInfo, setInfo] = useState({
    title: "",
    contents: "",
  });

  const [comments, setComments] = useState({
    text: "",
  });
  return (
    <div>
      <Switch>
        <Route exact path="/posts">
          <Posts posts={postInfo} comments={comments} />
        </Route>
        <Route>
          <div>
            <h1>Post Database</h1>
            <button onClick={() => history.push("/posts")}>Get Posts</button>
          </div>
        </Route>
      </Switch>
      <Link to="/">Home</Link>
    </div>
  );
}

export default App;
