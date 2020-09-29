import React from "react";
import { useSelector } from "react-redux";
// import { createSelector } from "reselect";
//https://react-redux.js.org/api/hooks

//When using useSelector with an inline selector as shown above, a new instance of the selector is created whenever the component is rendered. This works as long as the selector does not maintain any state. However, memoizing selectors (e.g. created via createSelector from reselect) do have internal state, and therefore care must be taken when using them. Below you can find typical usage scenarios for memoizing selectors.

// When the selector does only depend on the state, simply ensure that it is declared outside of the component so that the same selector instance is used for each render:
// const selectAlert = createSelector(
//   (state) => state.alert,
//   (alerts) => (alerts !== null && alerts.length > 0 ? alerts : null)
// );
const Alert = () => {
  //we want multiple alerts so not using createSelectors
  // const alerts = useSelector(selectAlert);
  const alerts = useSelector(state=>state.alert);

  // console.log(alerts);
  const alertComponent = alerts
    ? alerts.map((alert) => {
        return (
          <div key={alert.id} className={`alert alert-${alert.alertType}`}>
            {alert.msg}
          </div>
        );
      })
    : null;
  return alertComponent;
};

export default Alert;
