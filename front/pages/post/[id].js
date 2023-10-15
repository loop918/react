// post/[id].js 다이나믹 라우팅. post 의 특정글을 조회.
import { useRouter } from 'next/router';
import axios from 'axios';
import {END} from 'redux-saga';
import wrapper from '../../store/configureStore';
import Head from 'next/head';

import { useSelector } from 'react-redux';
import {LOAD_MY_INFO_REQUEST} from '../../reducers/user';
import {LOAD_POST_REQUEST} from '../../reducers/post';

import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';

const Post = () => {
    const router = useRouter();
    const { id } = router.query;

    const { singlePost }  = useSelector((state) => state.post);

    return (
        <AppLayout>
            <Head>
                <title>
                    {singlePost.User.nickname}
                </title>
                <meta name="description" content={singlePost.content}/>
                <meta name="og:title" content={`${singlePost.User.nickname}`}/>
                <meta name="og:description" content={singlePost.content}/>
                <meta name="og:image" content={singlePost.Images[0] ? singlePost.Images[0].src : 'https://nodebird.com/favicon.ico'}/>
                <meta name="og:url" content={`https://nodebird.com/post/${id}`}/>                
            </Head>
            <PostCard post={singlePost}/>
        </AppLayout>
    )
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    // 내정보 요청.
    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    // 특정글 요청.
    context.store.dispatch({
        type : LOAD_POST_REQUEST,
        data : context.params.id, // 또는, context.query.id
    })

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  });
  

export default Post;