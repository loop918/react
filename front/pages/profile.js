import React, { useEffect } from 'react';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import Head from 'next/head';

import NicknameEditForm from '../components/NicknameEditForm';
import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';

const Profile = () => {
  const { isLoggedIn } = useSelector(state => state.user);

  useEffect(() => {
    if (!isLoggedIn) {
      Router.replace('/');
    }
  }, [isLoggedIn])
  const { me }  = useSelector((state) => state.user);

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

export default Profile;
