import jwt from 'jsonwebtoken';

export default {

  // token verification
  verifyToken(req, res, next) {
    const token = req.headers.cookie.replace('token=', '');

    if (!token) return res.status(403).redirect('/login');

    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = decoded;
    } catch (err) {
      console.error(err);
      return res.status(401).send({'Token invalide': err});
    }
    return next();
  },
};
