const express = require('express');
const router = express.Router();
const Session = require('../javascript/domain/pojo/session')
const session = new Session()
const TokenGenerator = require('uuid-token-generator');
const tokenGenerator = new TokenGenerator();

const UserStorage = require('../data/UsersStorage.js')
const UStorage = new UserStorage()
const MessageStorage = require('../data/MessagesStorage')
const MStorage = new MessageStorage()
const FriendsStorage = require('../data/FriendsStorage.js')
const FStorage = new FriendsStorage()
const PostsStorage = require('../data/PostsStorage.js')
const User = require("../javascript/domain/pojo/user");
const UserData = require("../javascript/domain/pojo/userData");
const PStorage = new PostsStorage()


router.get('/', function(req, res, next) {
    res.redirect('/login')
});

router.get('/login', (req, res, next) => {
    // res.render('login/login.pug')
    res.sendFile('C:\\Users\\danil\\WebstormProjects\\SocialAdmin\\public\\gulp\\html\\login.html')
})

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = UStorage.accessRequest(email, password)
    if (user) {
        if(user.role.name === 'admin'){
            const token = tokenGenerator.generate()
            session.addSession(user.id, token)
            res.status(200).json({ sessionToken: token})
        } else {
            res.status(403).send({message:'Вашего статуса недостаточно для просмотра этой страницы'})
        }
    } else {
        res.status(401).send('Invalid view credentials');
    }
    // for 4th lab
    /*
    if (user) {
        const token = tokenGenerator.generate()
        session.addSession(user.id, token)
        res.status(200).json({ sessionToken: token})
    } else {
        res.status(401).send('Invalid view credentials');
    }
     */
});

router.get('/adminPanel', (req, res, next) => {
    const sessionToken = req.cookies.sessionToken;
    const userid = session.checkSession(sessionToken)
    if (UStorage.getUserById(userid).role.name === 'admin'){
        const allUsers = UStorage.getUsers()
        res.render('adminPanel/adminPanel.pug', {users: allUsers })
    } else {
        res.redirect('/');
    }
})

router.get('/userPage:userId', (req, res) => {
    const requireUserId = parseInt(req.params.userId);
    const requireUser = UStorage.getUserById(requireUserId)

    const sessionToken = req.cookies.sessionToken;
    const userId = parseInt(session.checkSession(sessionToken))
    /*if (requireUserId === userId) {
        console.log(PStorage.getPosts(requireUserId))
        res.render('userPage/selfPage.pug', {user: requireUser, posts: PStorage.getPosts(requireUserId)})
    } else*/
    if (UStorage.getUserById(userId).role.name === 'admin'){
        const posts = PStorage.getPosts(requireUserId)
        posts.sort((a, b) => b.dateCreated - a.dateCreated);
        res.render('userPage/userPageAdmin.pug', { user: requireUser, posts: posts});
    } else {
        res.redirect('/')
    }
    /* else {
        res.render('userPage/userPage', {user: requireUser})
    }*/
});

router.put('/changeUserData', (req, res, next) => {
    const userId = parseInt(req.body.userId);
    const editedLName = req.body.editedLName;
    const editedFName = req.body.editedFName;
    const editedMName = req.body.editedMName;
    const editedBirthday = req.body.editedBirthday;
    const editedEmail = req.body.editedEmail;
    const sessionToken = req.cookies.sessionToken;
    const senderId = parseInt(session.checkSession(sessionToken))

    if (senderId === userId || UStorage.getUserById(senderId).role.name === 'admin'){
        UStorage.updateUserData(
            userId,
            new UserData(
                editedFName,
                editedMName,
                editedLName,
                editedBirthday,
                editedEmail
            )
        )
    }

    res.status(200).json({ message: 'Данные пользователя успешно обновлены.' });
})

router.get('/userFriends:userId', (req, res, next) => {
    const requireId = parseInt(req.params.userId)
    const user = UStorage.getUserById(requireId)
    const friendsId = FStorage.getFriendsId(requireId)
    const friends = friendsId.map(friendId => UStorage.getUserById(friendId))

    res.render('userFriends/userFriends.pug', {friends: friends, user: user})
})

router.get('/news:userId', (req, res, next) => {
    const requireId = parseInt(req.params.userId);
    const friendsId = FStorage.getFriendsId(requireId);
    let posts = [];

    friendsId.forEach(friendId => {
        const friendPosts = PStorage.getPosts(friendId);
        posts = posts.concat(friendPosts);
    });

    posts.sort((a, b) => b.dateCreated - a.dateCreated);
    res.render('news/newsPage.pug', { posts: posts });
});

router.post('/changeUserRole', (req, res, next) => {
    const userId = parseInt(req.body.userId)
    const role = req.body.role

    const sessionToken = req.cookies.sessionToken;
    const senderId = parseInt(session.checkSession(sessionToken))
    if (UStorage.getUserById(senderId).role.name === 'admin') {
        UStorage.changeRole(userId, role)
        res.status(200).json({message: 'Роль пользователя успешно обновлена.'})
    } else {
        res.redirect('/')
    }
})

router.post('/changeUserStatus', (req, res, next) => {
    const userId = parseInt(req.body.userId)
    const status = req.body.status

    const sessionToken = req.cookies.sessionToken;
    const senderId = parseInt(session.checkSession(sessionToken))
    if (UStorage.getUserById(senderId).role.name === 'admin') {
        UStorage.changeStatus(userId, status)
        res.status(200).json({message: 'Статус пользователя успешно обновлен.'})
    } else {
        res.redirect('/')
    }
})

/*
router.get('/userMessages:userId', (req, res, next) => {
    const requireId = parseInt(req.params.userId)

    const sessionToken = req.cookies.sessionToken;
    const userId = parseInt(session.checkSession(sessionToken))

    if (UStorage.getUserById(userId).role.name === 'admin'){
        res.render('userMessages/userMessages.pug', {messages: MStorage.getMessagesForId(requireId), userId: requireId})
    } else {
    }

})
 */
module.exports = router;