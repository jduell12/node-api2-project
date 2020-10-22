import React, { useState } from "react";
import { Switch, Route, useHistory, Link } from "react-router-dom";

//components
import Posts from "./components/Posts";

//context
import { PostContext } from "./context/PostContext";

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
        <PostContext.Provider
          value={{ postInfo, setInfo, comments, setComments }}
        >
          <Route exact path="/posts">
            <Posts querykey={"post"} />
          </Route>

          <Route exact path="/">
            <div>
              <h1>Post Database</h1>
              <button onClick={() => history.push("/posts")}>Get Posts</button>
            </div>
          </Route>
        </PostContext.Provider>
      </Switch>

      <Link to="/">Home</Link>
    </div>
  );
}

export default App;
