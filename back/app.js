const express = require('express');
const app = express();

const userRouter = require('./routes/user');
const postRouter = require('./routes/post');

app.get('/', (req,res) => {
    res.send('hello express'); 
});

app.use('/user', userRouter); // User 라우터
app.use('/post', postRouter); // Post 라우터

// server port 3065
app.listen(3065 ,() => {
    console.log(3065);
});
