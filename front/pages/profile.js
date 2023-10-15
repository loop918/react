import React, { useState ,useEffect , useCallback} from 'react';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import Head from 'next/head';
import {END} from 'redux-saga';
import axios from 'axios';
import useSWR, { useSWRInfinite } from 'swr';

import NicknameEditForm from '../components/NicknameEditForm';
import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';

import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';
//swr
const fetcher = ( url ) => axios.get(url, {withCredentials : true}).then((result) => result.data);

const Profile = () => {
  const { me }  = useSelector((state) => state.user);
  const [followersLimit, setFollowersLimit] = useState(3);
  const [followingsLimit, setFollowingsLimit] = useState(3);
  //swr
  const { data : followersData , error : followersError } = useSWR(`http://localhost:3065/user/followers?limit=${followersLimit}`, fetcher); 
  const { data : followingsData , error : followingsError } = useSWR(`http://localhost:3065/user/followings?limit=${followingsLimit}`, fetcher); 

  useEffect(() => {
    if (!me ) {
      Router.replace('/');
    }
  }, [me])
   
  const loadMoreFollowings = useCallback(() => {
    setFollowingsLimit((prev) => prev + 3)
  },[])

  const loadMoreFollowers = useCallback(() => {
    setFollowersLimit((prev) => prev + 3)
  },[])

  if(!me) {
    return '내 정보 로딩중...';
  }

  if (followersError || followingsError) {
    console.error(followersError || followingsError);
    return <div>팔로잉/팔로워 로딩 중 에러가 발생합니다.</div>;
  }

  return (
    <AppLayout>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <NicknameEditForm />
      <FollowList header="팔로잉" data={followingsData} onClickMore={loadMoreFollowings} loading={!followingsData && !followersData} />
      <FollowList header="팔로워" data={followersData}  onClickMore={loadMoreFollowers}  loading={!followersData && !followingsData} />
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
   
   context.store.dispatch(END);
   await context.store.sagaTask.toPromise();
 });

export default Profile;