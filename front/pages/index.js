import React, {useEffect} from 'react';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import {LOAD_MY_INFO_REQUEST} from '../reducers/user';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import { END } from 'redux-saga';

import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import AppLayout from '../components/AppLayout';

import wrapper from '../store/configureStore';

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);
  const { mainPosts , hasMorePost, loadPostsLoading, retweetError} = useSelector(state => state.post);

  // 리트윗 에러 알림.
  useEffect(() => {
    if(retweetError) {
      alert(retweetError);
    }
  }, [retweetError])

  useEffect(() => {
    function onScroll() {
      console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight);
      // 현재 스크롤 위치, 전체중 스크롤 높이 위치, 총 스크롤 높이 위치
      if ( window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight -300 ) {
        if (hasMorePost && !loadPostsLoading) {
            // 마지막 게시글의 LastId 조회
            const lastId = mainPosts[mainPosts.length - 1]?.id;
            dispatch({
              type : LOAD_POSTS_REQUEST,
              lastId,
            })
        }
      }

    }

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    }
  }, [hasMorePost, loadPostsLoading, mainPosts ]);
  
  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map((c) => {
        return (
          <PostCard key={c.id} post={c} />
        );
      })}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  console.log(context.req.headers);
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_POSTS_REQUEST,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Home;