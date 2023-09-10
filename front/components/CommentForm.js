import { Button, Form, Input } from 'antd';
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const CommentForm = ({ post }) => {
  const id = useSelector((state) => state.user.me?.id);
  const {addCommentDone} = useSelector((state) => state.posts);  
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    if(addCommentDone) {
      setCommentText('');
    }
  },[addCommentDone]);
  
  const onSubmitComment = useCallback(() => {
    dispatch({
      type : ADD_COMMENT_REQUEST,
      data : {content : commentText, postId : post.id, userId : id}
    });
  }, [commentText, id]);

  const onChangeCommentText = useCallback((e) => {
    setCommentText(e.target.value);
  }, []);

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item style={{ position: 'relative', margin: 0 }}>
        <Input.TextArea rows={4} name="commentText" value={commentText} onChange={onChangeCommentText} />
        <Button style={{ position: 'absolute', right: 0, bottom: -40 }} type="primary" htmlType="submit">삐약</Button>
      </Form.Item>
    </Form>
  );

};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
