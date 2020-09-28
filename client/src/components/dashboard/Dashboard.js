import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector, shallowEqual } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";

const Dashboard = () => {
  const dispatch = useDispatch();
  const profileState = useSelector((state) => state.profile, shallowEqual);
  const authState = useSelector((state) => state.auth, shallowEqual);
  React.useEffect(() => {
    dispatch(getCurrentProfile());
  }, []);
  // console.log(profileState);
  // console.log(authState);
  const { profile, loading } = profileState;
  const { user } = authState;
  console.log(profile);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <section className="container">
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Welcome {user && user.name}
        </p>
        {profile !== null ? (
          <>has</>
        ) : (
          <>
            <p>You have not yet set up a profile </p>
            <Link to="create_profile" className="btn btn-primary my-1">
              Create Profile
            </Link>
          </>
        )}
      </section>
    </>
  );
};

export default Dashboard;
