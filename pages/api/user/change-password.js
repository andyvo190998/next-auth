import { getSession } from 'next-auth/react';
import { connectDb } from '../../../helpers/db';
import hashedPassword, { isValid } from '../../../helpers/hashedPassword';
import User1 from '../../../helpers/User1';

const handler = async (req, res) => {
  if (req.method !== 'PATCH') {
    return;
  }
  const session = await getSession({ req: req });
  if (!session) {
    res.status(403).json({ message: 'Not authenticated' });
    return;
  }
  const userEmail = session.user.email;
  const inputOldPassword = req.body.oldPassword;
  const inputNewPassword = req.body.newPassword;

  await connectDb();
  const user = await User1.findOne({ email: userEmail });
  if (!user) {
    res.status(403).json({ message: 'user not found' });
    return;
  }

  const checkPassword = await isValid(inputOldPassword, user.password);
  if (!checkPassword) {
    res.status(401).json({ message: 'Incorrect password' });
    return;
  }

  const hashed = await hashedPassword(inputNewPassword);
  const result = await User1.updateOne(
    { email: userEmail },
    { $set: { password: hashed } }
  );
  res.status(200).json({ message: 'update successful' });
  return result;
};

export default handler;
