// // Example middleware to extract user ID from JWT token
// const jwt = require('jsonwebtoken');

// const commentMiddleware = (req, res, next) => {
//   const token = req.header('Authorization');
//   if (!token) return res.status(401).json({ message: 'Unauthorized' });

//   try {
//     const decoded = jwt.verify(token, jwtSecretKey);
//     req.user = decoded.user;
//     next();
//   } catch (error) {
//     console.error('Authentication error:', error);
//     res.status(401).json({ message: 'Token is not valid' });
//   }
// };

// module.exports = commentMiddleware;
