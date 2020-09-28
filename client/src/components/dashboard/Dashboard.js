import React from "react";
import { useDispatch } from "react-redux";
import { useSelector, shallowEqual } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";

const Dashboard = () => {
  const dispatch = useDispatch();
  const auth = useSelector(
    (state) => state.auth,
    (state) => state.profile,
    shallowEqual
  );
  React.useEffect(() => {
    dispatch(getCurrentProfile());
  }, []);
  return <div>Dashboard</div>;
};

export default Dashboard;
