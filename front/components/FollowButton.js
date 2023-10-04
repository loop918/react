import React,{useCallback} from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user';

const FollowButton = ({ post }) => {
  const dispatch = useDispatch();
  const {me, followLoading, unfollowLoading} = useSelector((state) => state.user);

  const isFollwing =me?.Followings.find((v) => v.id === post.User.id);

  const onClickButton = useCallback(()=> {
    if(isFollwing) {
      dispatch({
        type : UNFOLLOW_REQUEST,
        data : post.User.id,
      }) 
    } else {
      dispatch({
        type : FOLLOW_REQUEST,
        data : post.User.id,
      }) 
    }
  },[])

  // 내가 쓴 글은 팔로우 버튼 안뜨게 처리..
  if(post.User.id === me.id) {
    return null;
  }

  return (
    <Button loading={followLoading || unfollowLoading} onClick={onClickButton}>
      {isFollwing ? '언팔로우' : '팔로우'} 
    </Button>
  );
};

FollowButton.propTypes = {
  post: PropTypes.object.isRequired,
};

export default FollowButton;
