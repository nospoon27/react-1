import React from "react";
import { connect } from "react-redux";
import { follow, unfollow, setCurrentPage, setUsersTotalCount, 
  toggleFollowProgress, requestUsers } from "../../redux/usersReducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from "../../redux/usersSelectors";

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.requestUsers(this.props.currentPage, this.props.pageSize);
  }

  onPageChanged = (pageNumber) => {
    this.props.requestUsers(pageNumber, this.props.pageSize);
    this.props.setCurrentPage(pageNumber);
  };

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users totalUsersCount={this.props.totalUsersCount} 
             pageSize={this.props.pageSize}
             currentPage={this.props.currentPage}
             unfollow={this.props.unfollow}
             follow={this.props.follow}
             users={this.props.users}
             onPageChanged={this.onPageChanged}
             toggleFollowProgress={this.props.toggleFollowProgress}
             followingInProgress={this.props.followingInProgress} />
      </>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};

export default connect(mapStateToProps, {
  follow,
  unfollow,
  setCurrentPage,
  setUsersTotalCount,
  toggleFollowProgress,
  getUsers
})(UsersContainer);
