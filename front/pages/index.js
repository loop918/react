import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import { LOAD_POSTS_REQUEST } from '../reducers/post';

import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import AppLayout from '../components/AppLayout';

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

  // 내 정보 가져오기. (미해결..)
  /*
  useEffect(() => {
    dispatch({
      type : LOAD_MY_INFO_REQUEST,
    })
  })
  */
  
  // 게시글 가져오기.
  useEffect(() => {
    dispatch({
      type : LOAD_POSTS_REQUEST,
    })
  }, []);

  useEffect(() => {
    function onScroll() {
      console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight);
      // 현재 스크롤 위치, 전체중 스크롤 높이 위치, 총 스크롤 높이 위치
      if ( window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight -300 ) {
        if (hasMorePost && !loadPostsLoading) {
            dispatch({
              type : LOAD_POSTS_REQUEST,
            })
        }
      }

    }

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    }

  },[hasMorePost, loadPostsLoading])
  
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

export default Home;
