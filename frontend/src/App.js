import React from "react";
import "./Styles/App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Posts from "./Screens/Posts";
import Form from "./Screens/Form";
import PostDetails from "./Screens/PostDetails";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import EditProfile from "./Screens/EditProfile";
import Profile from "./Screens/Profile";

function App() {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <BrowserRouter>
      <NavBar />
      <main>
        <Route path="/" component={() => <Redirect to="/posts" />} exact />
        <Route path="/posts" exact component={Posts} />
        <Route path="/posts/search" exact component={Posts} />
        <Route path="/Profile/:id" exact component={Profile} />

        <Route path="/createPost/:id?" component={Form} />
        <Route path="/Post/:id" component={PostDetails} />
        <Route path="/EditProfile/:id" component={EditProfile} />
        <Route
          path="/login"
          component={() => (!user ? <LoginScreen /> : <Redirect to="/" />)}
        />
        <Route
          path="/register"
          component={() => (!user ? <RegisterScreen /> : <Redirect to="/" />)}
        />
      </main>
    </BrowserRouter>
  );
}

export default App;
