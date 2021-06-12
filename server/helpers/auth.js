var admin = require('firebase-admin');

var serviceAccount = require('../config/fbServiceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.authCheck = async (req) => {
  try {
    const currentUser = await admin.auth().verifyIdToken(req.headers.authtoken);
    console.log('current user', currentUser);
    return currentUser;
  } catch (error) {
    console.log('Auth Check error', error.message);
    throw new Error('Invalid or Expired Token');
  }
};
