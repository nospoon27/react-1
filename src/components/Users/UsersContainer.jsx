import React from "react";
import { connect } from "react-redux";
import { followAC, unFollowAC, setUsersAC, setCurrentPageAC, setUsersTotalCountAC } from "../../redux/usersReducer";
import Users from "./Users";
import { usersAPI } from "../../api/usersAPI";

class UsersContainer extends React.Component {
  //* Как только компонент отрисовался
  componentDidMount() {
    usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
      .then((data) => {
        this.props.setUsers(data.items);
        this.props.setUsersTotalCount(data.totalCount);
      });
  }

  onPageChanged = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
    usersAPI.getUsers(pageNumber, this.props.pageSize)
      .then((data) => {
        this.props.setUsers(data.items);
      });
  };

  render() {
    return (
      <Users totalUsersCount={this.props.totalUsersCount} 
             pageSize={this.props.pageSize}
             currentPage={this.props.currentPage}
             unfollow={this.props.unfollow}
             follow={this.props.follow}
             users={this.props.users}
             onPageChanged={this.onPageChanged} />
    );
  }
}

let mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    follow: (userId) => {
      dispatch(followAC(userId));
    },
    unfollow: (userId) => {
      dispatch(unFollowAC(userId));
    },
    setUsers: (users) => {
      dispatch(setUsersAC(users));
    },
    setCurrentPage: (pageNumber) => {
      dispatch(setCurrentPageAC(pageNumber));
    },
    setUsersTotalCount: (totalCount) => {
      dispatch(setUsersTotalCountAC(totalCount));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
