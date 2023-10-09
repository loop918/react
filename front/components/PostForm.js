import React, { useRef, useCallback, useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {  UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE, ADD_POST_REQUEST } from '../reducers/post';


const PostForm = () => {
  const { imagePaths, addPostDone } = useSelector(state => state.post);
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  // 이미지 업로드시
  const onChangeImages = useCallback((e) =>{
    console.log('images', e.target.files);
    const imageFormData = new FormData(); // multipart 형식으로 server에 전송.
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f); // key : image, value : f   → server쪽 image이름으로 전달.
    });

    dispatch({
      type : UPLOAD_IMAGES_REQUEST,
      data : imageFormData,
    })
  },[])

  // 업로드 이미지 삭제 버튼.
  const onRemoveImage = useCallback((index) => () => {
    console.log('remove Image Index : ' + index);
    dispatch({
      type : REMOVE_IMAGE,
      data : index,
    })
  },[])

  // setText 초기화 (글 등록 후 & 페이지 열릴때 )
  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);

  // 등록 Submit
  const onSubmit = useCallback(() => {
    if(!text || !text.trim()) {
      return alert('게시글을 작성하세요.');
    }
    // formData 안에 이미지 배열 , content 를 넣어준다.
    const formData = new FormData();
    imagePaths.forEach((p) => {
      formData.append('image', p);  // req.body.image
    });
    formData.append('content', text);  // req.body.content
    return dispatch({
      type : ADD_POST_REQUEST,
      data : formData,
    });
  }, [text]);

  return (
    <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onFinish={onSubmit}>
      <Input.TextArea value={text} onChange={onChangeText} maxLength={140} placeholder="어떤 신기한 일이 있었나요?" />
      <div>
        <input type="file" name="image" multiple hidden ref={imageInput} onChange={onChangeImages}/>
        <Button onClick={onClickImageUpload} >이미지 업로드</Button>
        <Button type="primary" style={{ float: 'right' }} htmlType="submit">짹짹</Button>
      </div>
      <div>
        {imagePaths.map((v, i) => {
          return (
            <div key={v} style={{ display: 'inline-block' }}>
              <img src={'http://localhost:3065/' + v} style={{ width: '200px' }} alt={v} />
              <div>
                <Button onClick={onRemoveImage(i)}>제거</Button>
              </div>
            </div>
          )
        })}
      </div>
    </Form>
  );
};

export default PostForm;
