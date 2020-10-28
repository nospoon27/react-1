import React from "react";
import { connect } from "react-redux";
import { follow, unfollow, requestUsers, actions } from "../../redux/usersReducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from "../../redux/usersSelector";
import { UserType } from "../../types/types";
import { AppStateType } from "../../redux/reduxStore";
import { compose } from "redux";

type MapStatePropsType = {
  users: Array<UserType>
  pageSize: number
  totalUsersCount: number
  currentPage: number
  isFetching: boolean
  followingInProgress: Array<number>
}

type MapDispatchToPropsType = {
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  setCurrentPage: (pageNumber: number) => void
  toggleFollowProgress: (isFetching: boolean, userId: number) => void
  requestUsers: (currentPage: number, pageSize: number) => void
}

type OwnPropsType = {
  pageTitle: string
}

type PropsType = MapStatePropsType & MapDispatchToPropsType & OwnPropsType;

class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    const {currentPage, pageSize} = this.props;
    this.props.requestUsers(currentPage, pageSize);
  }

  onPageChanged = (pageNumber: number) => {
    const {pageSize} = this.props;
    this.props.requestUsers(pageNumber, pageSize);
    this.props.setCurrentPage(pageNumber);
  };

  render() {
    return (
       <>
          <h2>{this.props.pageTitle}</h2>
          {this.props.isFetching ? <Preloader /> : null}
          <Users
             totalUsersCount={this.props.totalUsersCount}
             pageSize={this.props.pageSize}
             currentPage={this.props.currentPage}
             unfollow={this.props.unfollow}
             follow={this.props.follow}
             users={this.props.users}
             onPageChanged={this.onPageChanged}
             toggleFollowProgress={this.props.toggleFollowProgress}
             followingInProgress={this.props.followingInProgress}
          />
       </>
    );
  }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};
const {setCurrentPage, toggleFollowProgress} = actions;
// <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultRootState>
export default compose(connect<MapStatePropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
  follow,
  unfollow,
  requestUsers, 
  setCurrentPage, 
  toggleFollowProgress
})
)(UsersContainer);
