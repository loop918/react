import React, { useState, useCallback , useEffect} from 'react';
import { Card, Button, Avatar, Popover, List, Comment } from 'antd';
import { RetweetOutlined, HeartTwoTone, HeartOutlined, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';

import { useSelector , useDispatch} from 'react-redux';
import { REMOVE_POST_REQUEST, LIKE_POST_REQUEST, UNLIKE_POST_REQUEST , RETWEET_REQUEST } from '../reducers/post';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import PostImages from './PostImages';
import FollowButton from './FollowButton';

import moment from 'moment';
moment.locale('ko');

const CardWrapper = styled.div`
  margin-bottom: 20px;
`;

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me && state.user.me?.id);
  const liked = post.Likers.find((v) => v.id === id);
  const {removePostLoading, retweetError} = useSelector((state) => state.post);
  const [commentFormOpened, setCommentFormOpened] = useState(false);

  const onLike = useCallback(() => {
    if( !id ) {
      return alert('로그인이 필요합니다.');
    }    
    return dispatch({
      type : LIKE_POST_REQUEST,
      data : post.id,
    })
  }, []);

  const onUnlike = useCallback(() => {
    if( !id ) {
      return alert('로그인이 필요합니다.');
    }    
    return dispatch({
      type : UNLIKE_POST_REQUEST,
      data : post.id,
    })
  }, []);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    if( !id ) {
      return alert('로그인이 필요합니다.');
    }    
    return dispatch({
      type : REMOVE_POST_REQUEST,
      data : post.id,
    })
  },[])

  const onRetweet = useCallback(() => {
    if( !id ) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch ({
      type : RETWEET_REQUEST,
      data : post.id,
    })
  },[id]);

  return (
    <CardWrapper key={post.id}>
      <Card
        cover={post?.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" onClick={onRetweet} />,
          liked
            ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onUnlike} />
            : <HeartOutlined key="heart" onClick={onLike} />,
              <MessageOutlined key="message" onClick={onToggleComment} />,
          <Popover
            key="ellipsis"
            content={(
              <Button.Group>
                {id && post.User.id === id
                  ? (
                    <>
                      <Button>수정</Button>
                      <Button type="danger" loading={removePostLoading} onClick={onRemovePost}>삭제</Button>
                    </>
                  )
                  : <Button>신고</Button>}
              </Button.Group>
            )}
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        title={ post.RetweetId ?  `${post.User.nickname} 님이 리트윗 하셨습니다.` : null }
        extra={ id && <FollowButton post={post} />}
      >
        {post.RetweetId && post.Retweet
          ? (
              <Card
                  cover={post?.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}
              >
              <div style={{ float : 'right' }}> {moment(post.createdAt).format('YYYY.MM.DD')} </div>  
              <Card.Meta
                avatar={(
                  <Link href={`/user/${post.Retweet.User.id}`}>
                        <a>
                        <Avatar>{post.Retweet.User.nickname[0]}</Avatar>
                      </a>
                  </Link>
                )}
                title={post.Retweet.User.nickname}
                description={<PostCardContent postData={post.Retweet.content} />}
              />
            </Card>
            )
          : (
            <>
              <div style={{ float : 'right' }}> {moment(post.createdAt).format('YYYY.MM.DD')} </div>  

              <Card.Meta
                avatar={(
                   <Link href={`/user/${post.User.id}`}>
                      <a>
                        <Avatar>{post.User.nickname[0]}</Avatar>
                      </a>
                    </Link>
                  )}
                title={post.User.nickname}
                description={<PostCardContent postData={post.content} />}
              />
            </>
          )}
      </Card>
      {commentFormOpened && (
        <>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={(
                    <Link href={`/user/${item.User.id}`}>
                      <a>
                        <Avatar>{item.User.nickname[0]}</Avatar>
                      </a>
                    </Link>
                  )}
                  content={item.content}
                />
              </li>
            )}
          />
        </>
      )}
    </CardWrapper>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.any),
    Images: PropTypes.arrayOf(PropTypes.any),
    Likers: PropTypes.arrayOf(PropTypes.object),
    RetweetId : PropTypes.number,
    Retweet : PropTypes.objectOf(PropTypes.any),
  }),
};

export default PostCard;
