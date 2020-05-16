import React from "react";
import { connect } from "react-redux";
import { follow, unfollow, setUsers, setCurrentPage, setUsersTotalCount, setIsFetching } from "../../redux/usersReducer";
import Users from "./Users";
import { usersAPI } from "../../api/usersAPI";
import Preloader from "../common/Preloader/Preloader";

class UsersContainer extends React.Component {
  //* Как только компонент отрисовался
  componentDidMount() {
    this.props.setIsFetching(true);
    usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
      .then((data) => {
        this.props.setIsFetching(false);
        this.props.setUsers(data.items);
        this.props.setUsersTotalCount(data.totalCount);
      });
  }

  onPageChanged = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
    this.props.setIsFetching(true);
    usersAPI.getUsers(pageNumber, this.props.pageSize)
      .then((data) => {
        this.props.setIsFetching(false);
        this.props.setUsers(data.items);
      });
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
             onPageChanged={this.onPageChanged} />
      </>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching
  };
};

/*
let mapDispatchToProps = (dispatch) => {
  return {
    follow: (userId) => {
      dispatch(follow(userId));
    },
    unfollow: (userId) => {
      dispatch(unFollow(userId));
    },
    setUsers: (users) => {
      dispatch(setUsers(users));
    },
    setCurrentPage: (pageNumber) => {
      dispatch(setCurrentPage(pageNumber));
    },
    setUsersTotalCount: (totalCount) => {
      dispatch(setUsersTotalCount(totalCount));
    },
    setIsFetching: (isFetching) => {
      dispatch(setIsFetching(isFetching));
    }
  };
};
*/

export default connect(mapStateToProps, {
  follow,
  unfollow,
  setUsers,
  setCurrentPage,
  setUsersTotalCount,
  setIsFetching
})(UsersContainer);
