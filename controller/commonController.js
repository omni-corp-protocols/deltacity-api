const bcrypt = require('bcrypt');
const uuidv1 = require('uuid/v1');
const jwtSecretKey = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');
const hostURL = process.env.HOSTURL;
const { decrypt, encrypt } = require('../util/cryptoED');
const saltRounds = process.env.BCRYPTSALT;

//user login api @Vineet
const login = async (req, res, next) => {

  try {
    let emailAddress = req.body.emailAddress;
    let userPassword = req.body.userPassword;
    let userRes = await _db.get().collection(userCollection).findOne({ emailAddress });

    if (userRes) {

      if (userRes.emailVerified && userRes.emailVerified == 1) {
        let pass = await bcrypt.compare(userPassword, userRes.userPassword);

        if (pass) {
          const payload = { userId: userRes._id, email: userRes.emailAddress };
          payload.userRole = { userRoleBank: userRes.userRoleBank, userRoleCustodian: userRes.userRoleCustodian, userRoleAdmin: userRes.userRoleAdmin, userRoleManager: userRes.userRoleManager, userRoleInvestor: userRes.userRoleInvestor };
          const options = { expiresIn: 120 };
          let token = jwt.sign(payload, jwtSecretKey);
          let data = { token, twoFArecoveryKey: userRes.twoFArecoveryKey, email: userRes.emailAddress, twoFAEnabled: userRes.twoFAEnabled, emailVerified: userRes.emailVerified }
          res.status(200).send({ message: 'login success.', error: null, data });

        } else {
          res.status(200).send({ message: 'incorrect password.', error: null, data: null });

        }
      } else {
        res.status(200).send({ message: 'user not verified.', error: null, data: null });

      }
    } else {
      res.status(200).send({ message: 'user does not exist.', error: null, data: null });

    }
  } catch (err) {
    next(err);
  }
};


module.exports = {
  login,
}