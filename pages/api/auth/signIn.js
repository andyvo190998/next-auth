import { connectDb } from '../../../helpers/db';
import hashedPassword from '../../../helpers/hashedPassword';
import User1 from '../../../helpers/User1';
// import User1 from '../../../helpers/User1';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const email = req.body.email;
    const password = req.body.password;
    const hashedPassword1 = await hashedPassword(password);
    await connectDb();

    const existingEmail = await User1.findOne({ email: email });

    if (existingEmail) {
      console.log('User existing');
      //   throw new Error({ message: 'User existing' });
      res.status(404).json({ message: 'error' });
      return;
    }

    // const user = await new User1({
    //   email: email,
    //   password: hashedPassword1,
    // });
    const user = await new User1({
      email: email,
      password: hashedPassword1,
    });

    user
      .save()
      .then((item) => res.json(item))
      .catch((err) => console.log(err));
  }
};

export default handler;
