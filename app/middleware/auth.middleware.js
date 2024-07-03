import jwt from 'jsonwebtoken';

export default {
    
    // token verification
    verifyToken(req, res, next) {
        const token = req.headers['authorization'];
        if (!token) return res.status(403).redirect('/login');
      
        try {
          const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
          req.user = decoded;
        } catch (err) {
          return res.status(401).send('Token invalide');
        }
        return next()
    }
}


// rajouter la route login
// vérifier l'utilisateur en base
// si non c'est ciao retour page login 500
// si oui on créé le token et on l'envoie

// quand on passe dans les routes post/patch/delete
// on utilise le middleware verufytoken
