const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');

// router
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');

// db 
const db = require('./models');
// passport
const passportConfig = require('./passport');


// db sequelize
db.sequelize.sync()
.then(() => {
    console.log('db 연결 성공');
})
.catch(console.error);

app.use(cors({
    origin : 'http://localhost:3060',
    credentials : true, // 쿠키 전달 client -> server
}));

passportConfig();

// json형식의 Data req.body에 분석후, 넣어주는 역할
app.use(express.json());
// form.submit시 Data를 req.body에 넣어주는 역할
app.use(express.urlencoded({ extended:true }));

// session
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    saveUninitialized : false,
    resave : false,
    secret : process.env.COOKIE_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req,res) => {
    res.send('hello express'); 
});

app.use('/user', userRouter); // User 라우터
app.use('/post', postRouter); // Post 라우터

// server port 3065
app.listen(3065, () => {
    console.log("SERVER START :: → http://localhost:3065");
});
