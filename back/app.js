const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const hpp = require('hpp');
const helmet = require('helmet');
dotenv.config();

const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');

// router
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const hashtagRouter  = require('./routes/hashtag');
// db 
const db = require('./models');
// passport
const passportConfig = require('./passport');

// morgan 개발, 배포 분기 (개발 환경 설정)
if(process.env.NODE_ENV === 'production') {
    app.use(morgan('combined'));
    app.use(hpp());
    app.use(helmet());
} else {
    app.use(morgan('dev'));
}

// db sequelize
db.sequelize.sync()
.then(() => {
    console.log('db 연결 성공');
})
.catch(console.error);

app.use(morgan('dev'));
app.use(cors({
    origin : ['http://localhost:3060','nordbird.com'],
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

// __dirname → back 폴더를 나타냄  즉, path.join( __dirname , 'uploads' ) → back/uploads 
// '/' 는 localhost:3065를 표현.
app.use( '/' ,express.static( path.join( __dirname , 'uploads' )));
app.get('/', (req,res) => {
    res.send('hello express'); 
});

app.use('/user', userRouter); 
app.use('/post', postRouter); 
app.use('/posts', postsRouter);
app.use('/hashtag', hashtagRouter); 

// server port 3065
app.listen(80, () => {
    console.log("SERVER START :: → http://localhost:80");
});
