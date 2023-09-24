const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./models');

// db sequelize
db.sequelize.sync()
.then(() => {
    console.log('db 연결 성공');
})
.catch(console.error);

app.use(cors({
    origin : '*',
    credentials : false,
}));
// json형식의 Data req.body에 분석후, 넣어주는 역할
app.use(express.json());
// form.submit시 Data를 req.body에 넣어주는 역할
app.use(express.urlencoded({ extended:true }));

// router
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');

app.get('/', (req,res) => {
    res.send('hello express'); 
});

app.use('/user', userRouter); // User 라우터
app.use('/post', postRouter); // Post 라우터

// server port 3065
app.listen(3065 ,() => {
    console.log("server start → http://localhost:3065");
});
