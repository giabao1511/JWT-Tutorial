const jwt = require("jsonwebtoken");

const middlewareController = {
  verifyToken: async function (req, res, next) {
    const token = req.headers.token;
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.SECRET_JWT_KEY, (err, user) => {
        if (err) {
          return res.json({
            status: 403,
            msg: "Token is not valid",
          });
        }
        req.user = user;
        next();
      });
    } else {
      return res.json({
        status: 403,
        msg: "You're not authenticated",
      });
    }
  },

  verifyTokenAndAdmin: async (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      if (!req.user.admin) {
        res.json({
          status: 403,
          msg: "You can not delete other",
        });
      } 
      next(); 
    });
  },
};
module.exports = middlewareController;
