// routes/auth.js
const express = require('express');
const { registerUser, loginUser, userdetal } = require('../controllers/userController');
const { authenticateUser } = require('../middleware/auth');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/protected-route', authenticateUser, (req, res) => {
   res.json({ user: req.user });
 });

 router.get('/user-details', authenticateUser, userdetal);

 router.post('/logout', authenticateUser, async (req, res) => {
   try {
     req.user.tokens = req.user.tokens.filter((currElement) => {
       return currElement.token !== req.token;
     });
      await req.user.save();
 
     res.json({ message: 'Logout successful' });
   } catch (error) {
     console.error('Error during logout:', error);
     res.status(500).json({ error: 'Internal Server Error' });
   }
 });

module.exports = router;
