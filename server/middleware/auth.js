import jwt from 'jsonwebtoken';

const checkAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.ENCRYPT_SECRET_KEY);
        req.userData = { userId: decodedToken.userId, username: decodedToken.username };
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Authentication failed try Again' });
    }
};
export default checkAuth;