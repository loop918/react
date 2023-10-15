import React, { useEffect } from 'react';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import Head from 'next/head';
import {END} from 'redux-saga';
import axios from 'axios';

import NicknameEditForm from '../components/NicknameEditForm';
import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';

import { LOAD_MY_INFO_REQUEST,LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST } from '../reducers/user';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import wrapper from '../store/configureStore';

const Profile = () => {
  const dispatch = useDispatch();

  const { me }  = useSelector((state) => state.user);

  useEffect(() => {
    dispatch({
      type : LOAD_FOLLOWERS_REQUEST,
    })
    dispatch({
      type : LOAD_FOLLOWINGS_REQUEST,
    })

  },[]);

  useEffect(() => {
    if (!me && me.id) {
      Router.replace('/');
    }
  }, [me && me.id])
  

  return (
    <AppLayout>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <NicknameEditForm />
      <FollowList header="팔로잉" data={me.Followings} />
      <FollowList header="팔로워" data={me.Followers} />
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  // 서버사이드 렌더링시. 쿠키정보 넣어주기.
   const cookie = context.req ? context.req.headers.cookie : '';
   axios.defaults.headers.Cookie = '';
   if( context.req && cookie) {
     axios.defaults.headers.Cookie = cookie;
   } 
   // 내 정보 가져오기.
   context.store.dispatch({
     type: LOAD_MY_INFO_REQUEST,
   });
   // 게시글 가져오기
   context.store.dispatch({
     type: LOAD_POSTS_REQUEST,
   });
   
   context.store.dispatch(END);
   await context.store.sagaTask.toPromise();
 });

export default Profile;