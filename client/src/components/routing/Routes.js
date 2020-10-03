import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Alerts from "../layout/Alert";
import Dashboard from "../dashboard/Dashboard";
import CreateProfile from "../profile_form/CreateProfile";
import PrivateRoute from "../routing/PrivateRoute";
import EditProfile from "../profile_form/EditProfile";
import AddEducation from "../profile_form/AddEducation";
import AddExperience from "../profile_form/AddExperience";
import Profiles from "../profiles/Profiles";
import Profile from "../profile/Profile";
import Posts from "../posts/Posts";
import Post from "../post/Post";
import NotFound from "../layout/NotFound";
const Routes = () => {
  return (
    <section className="container">
 <Alerts />
 <Switch>
   <Route exact path="/register" component={Register}></Route>
   <Route exact path="/login" component={Login}></Route>
   <Route exact path="/profiles" component={Profiles}></Route>
   <Route exact path="/profile/:id" component={Profile}></Route>
   <PrivateRoute
     exact
     path="/dashboard"
     component={Dashboard}
   ></PrivateRoute>
   <PrivateRoute
     exact
     path="/create_profile"
     component={CreateProfile}
   ></PrivateRoute>
   <PrivateRoute
     exact
     path="/edit_profile"
     component={EditProfile}
   ></PrivateRoute>
   <PrivateRoute
     exact
     path="/add_experience"
     component={AddExperience}
   ></PrivateRoute>
   <PrivateRoute
     exact
     path="/add_education"
     component={AddEducation}
   ></PrivateRoute>
   <PrivateRoute exact path="/posts" component={Posts}></PrivateRoute>
   <PrivateRoute
     exact
     path="/posts/:id"
     component={Post}
   ></PrivateRoute>
   <Route component={NotFound}></Route>
 </Switch>
</section>
  )
}

export default Routes


