const express = require('express');
const router = express.Router();
const AuthRoute = require('../routes/authRoutes')
const UserRoute = require('../routes/userRoutes')

router.use('/api/auth', AuthRoute);
router.use('/api/users', UserRoute);
router.use('/', function (req, res){
    res.send('API is running...');
})

module.exports = router;