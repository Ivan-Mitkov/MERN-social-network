import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";
import { getAllProfiles } from "../../actions/profile";

const Profiles = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile, shallowEqual);
  const { profiles, loading } = profile;

  useEffect(() => {
    dispatch(getAllProfiles());
    console.log('Use effect profiles')

    // eslint-disable-next-line
  }, [loading]);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop" /> Browse and connect with
            developers
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Profiles;
