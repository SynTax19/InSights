import "./App.css";
import React from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import LoadingBar from "react-top-loading-bar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react/cjs/react.development";

const App = () => {
  //c = "Suvrodeep";
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;

  const [progress, setProgress] = useState(0);

  return (
    <>
      <Router>
        <LoadingBar color="#f11946" progress={progress} height={4} />
        <Navbar />

        <Switch>
          <Route exact path="/">
            <News
              apiKey={apiKey}
              setProgress={setProgress}
              key="home"
              pageSize={9}
              country="in"
              category="general"
            />
          </Route>
          <Route exact path="/general">
            <News
              apiKey={apiKey}
              setProgress={setProgress}
              key="general"
              pageSize={9}
              country="in"
              category="general"
            />
          </Route>
          <Route exact path="/business">
            <News
              apiKey={apiKey}
              setProgress={setProgress}
              key="business"
              pageSize={9}
              country="in"
              category="business"
            />
          </Route>
          <Route exact path="/sports">
            <News
              apiKey={apiKey}
              setProgress={setProgress}
              key="sports"
              pageSize={9}
              country="in"
              category="sports"
            />
          </Route>
          <Route exact path="/entertainment">
            <News
              apiKey={apiKey}
              setProgress={setProgress}
              key="entertainment"
              pageSize={9}
              country="in"
              category="entertainment"
            />
          </Route>
          <Route exact path="/health">
            <News
              apiKey={apiKey}
              setProgress={setProgress}
              key="health"
              pageSize={9}
              country="in"
              category="health"
            />
          </Route>
          <Route exact path="/science">
            <News
              apiKey={apiKey}
              setProgress={setProgress}
              key="science"
              pageSize={9}
              country="in"
              category="science"
            />
          </Route>
          <Route exact path="/technology">
            <News
              apiKey={apiKey}
              setProgress={setProgress}
              key="technology"
              pageSize={9}
              country="in"
              category="technology"
            />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
