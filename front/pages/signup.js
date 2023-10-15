import React, { useState, useCallback, useEffect } from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import Router from 'next/router';

import { END } from 'redux-saga';
import axios from 'axios';

import {SIGN_UP_REQUEST } from '../reducers/user';
import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';
import wrapper from '../store/configureStore';


const Signup = () => {

    const [passwordCheck, setPasswordCheck] = useState('');
    const [term, setTerm] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [termError, setTermError] = useState(false);

    const [email, onChangeEmail] = useInput('');
    const [nick, onChangeNick] = useInput('');
    const [password, onChangePassword] = useInput('');

    const dispatch = useDispatch();
    const { user, signUpLoading, signUpDone, signUpError, me} = useSelector((state) => state.user);

    useEffect(() => {
      if (me) {
        alert('로그인이 이미 되어 있습니다.');
        Router.replace('/');
      }
    }, [me])
    

    // 회원가입 완료시 메인페이지로 이동.
    useEffect(() => {
      if(signUpDone) {
        Router.replace('/');
      } 
    },[signUpDone]);

    useEffect(() => {
      if(signUpError){
        alert(signUpError);
      }
    },[signUpError]);

    // 로그인 상태 여부 확인
    useEffect(() => {
      if (user) {
        alert('로그인했으니 메인페이지로 이동합니다.');
        Router.push('/');
      }
    }, [user && user.email]);

    // 회원가입 버튼 클릭시..
    const onSubmit = useCallback(() => {
      if (password !== passwordCheck) {
        return setPasswordError(true);
      }
      if (!term) {
        return setTermError(true);
      }
      dispatch({
        type : SIGN_UP_REQUEST,
        data : {email, password, nickname : nick}
      })

    }, [password, passwordCheck, term]);

    // 비밀번호 일치 여부 확인
    const onChangePasswordCheck = useCallback((e) => {
      setPasswordError(e.target.value !== password);
      setPasswordCheck(e.target.value);
    }, [password]);

    // 동의 체크 조항 확인.
    const onChangeTerm = useCallback((e) => {
      setTermError(false);
      setTerm(e.target.checked);
    }, []);

    return (
      <AppLayout>
        <Head>
          <title>회원가입 | NodeBird</title>
        </Head>
        <Form onFinish={onSubmit} style={{ padding: 10 }}>
          <div>
            <label htmlFor="user-email">아이디</label>
            <br />
            <Input name="user-email" type="email" value={email} required onChange={onChangeEmail} />
          </div>
          <div>
            <label htmlFor="user-nick">닉네임</label>
            <br />
            <Input name="user-nick" value={nick} required onChange={onChangeNick} />
          </div>
          <div>
            <label htmlFor="user-password">비밀번호</label>
            <br />
            <Input name="user-password" type="password" value={password} required onChange={onChangePassword} />
          </div>
          <div>
            <label htmlFor="user-password-check">비밀번호체크</label>
            <br />
            <Input name="user-password-check" type="password" value={passwordCheck} required onChange={onChangePasswordCheck} />
            {passwordError && <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div>}
          </div>
          <div>
            <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>제로초 말을 잘 들을 것을 동의합니다.</Checkbox>
            {termError && <div style={{ color: 'red' }}>약관에 동의하셔야 합니다.</div>}
          </div>
          <div style={{ marginTop: 10 }}>
            <Button type="primary" htmlType="submit" loading={signUpLoading}>가입하기</Button>
          </div>
        </Form>
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


export default Signup;