import React from "react";
import Profile from "./Profile";
import { profileAPI } from "../../api/profileAPI";
import { setUserProfile } from '../../redux/profileReducer'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if(!userId) {
      userId = 2;
    }
    profileAPI.getProfile(userId).then((data) => {
      this.props.setUserProfile(data);
    });
  }

  render() {
    return (
      <div>
        <Profile {...this.props} profile={this.props.profile} />
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile
});

let withUrlDataComponentContiner = withRouter(ProfileContainer);

export default connect(mapStateToProps, {
  setUserProfile
})(withUrlDataComponentContiner);
