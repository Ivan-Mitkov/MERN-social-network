import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfileById } from "../../actions/profile";
import ProfileAbout from "./ProfileAbout";
import ProfileEducation from "./ProfileEducation";
import ProfileExperience from "./ProfileExperience";
import ProfileGithub from "./ProfileGithub";
import ProfileTop from "./ProfileTop";

const Profile = ({ match }) => {
  const dispatch = useDispatch();
  const profileState = useSelector((state) => state.profile, shallowEqual);
  // console.log(profile);
  const auth = useSelector((state) => state.auth, shallowEqual);
  useEffect(() => {
    dispatch(getProfileById(match.params.id));
    console.log("Use effect Profile");
    //eslint-disable-next-line
  }, [getProfileById, match.params.id]);
  // console.log(auth);

  const { profile } = profileState;
  const isProfileOfLoggedInUser = () => {
    return (
      auth.isAuthenticated &&
      auth.loading === false &&
      auth.user &&
      profile &&
      profile.user &&
      auth.user._id === profile.user._id
    );
  };
  return (
    <>
      {!profile || profile.loading ? (
        <Spinner />
      ) : (
        <>
          <Link to="/profiles" className="btn btn-light">
            Back to all profiles
          </Link>
          {isProfileOfLoggedInUser() && (
            <Link to="/edit_profile" className="btn btn-dark">
              Edit Profile
            </Link>
          )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map((experience) => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No experience credentials</h4>
              )}
            </div>
            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map((education) => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No education credentials</h4>
              )}
            </div>

            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
