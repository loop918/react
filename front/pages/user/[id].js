import React, {useEffect} from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Avatar, Card } from 'antd';
import Head from 'next/head';

import { useDispatch, useSelector } from 'react-redux';
import {  LOAD_USER_POSTS_REQUEST } from '../../reducers/post';
import { LOAD_MY_INFO_REQUEST, LOAD_USER_REQUEST } from '../../reducers/user';
import { END } from 'redux-saga';

import PostCard from '../../components/PostCard';
import AppLayout from '../../components/AppLayout';

import wrapper from '../../store/configureStore';

const User = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { mainPosts , hasMorePost, loadPostsLoading} = useSelector(state => state.post);
  const { userInfo } = useSelector(state => state.user);

  useEffect(() => {
    function onScroll() {
      console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight);
      // 현재 스크롤 위치, 전체중 스크롤 높이 위치, 총 스크롤 높이 위치
      if ( window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight -300 ) {
        if (hasMorePost && !loadPostsLoading) {

            // 마지막 게시글의 LastId 조회
            const lastId = mainPosts[mainPosts.length - 1]?.id;

            dispatch({
              type : LOAD_USER_POSTS_REQUEST ,
              lastId: mainPosts[mainPosts.length - 1] && mainPosts[mainPosts.length - 1].id,
              data: id,
            })
        }
      }

    }

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    }
  }, [hasMorePost, loadPostsLoading, id, mainPosts.length ]);
  
  return (
        <AppLayout>
            {userInfo && (
                <Head>
                <title>
                    {userInfo.nickname}
                    님의 글
                </title>
                <meta name="description" content={`${userInfo.nickname}님의 게시글`} />
                <meta property="og:title" content={`${userInfo.nickname}님의 게시글`} />
                <meta property="og:description" content={`${userInfo.nickname}님의 게시글`} />
                <meta property="og:image" content="https://nodebird.com/favicon.ico" />
                <meta property="og:url" content={`https://nodebird.com/user/${id}`} />
                </Head>
            )}
            {userInfo
                ? (
                <Card
                    actions={[
                    <div key="twit">
                        짹짹
                        <br />
                        {userInfo.Posts}
                    </div>,
                    <div key="following">
                        팔로잉
                        <br />
                        {userInfo.Followings}
                    </div>,
                    <div key="follower">
                        팔로워
                        <br />
                        {userInfo.Followers}
                    </div>,
                    ]}
                >
                    <Card.Meta
                    avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
                    title={userInfo.nickname}
                    />
                    </Card>
                    )
                    : null}
            {mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
        </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  context.store.dispatch({
    type: LOAD_USER_POSTS_REQUEST,
    data : context.params.id,
  });

  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_USER_REQUEST,
    data : context.params.id,
  });

  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default User;