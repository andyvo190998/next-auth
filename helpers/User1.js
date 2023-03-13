import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User1 = mongoose.models.User1 || mongoose.model('User1', userSchema);
export default User1;

// export default mongoose.models.User1 || mongoose.model('User1', userSchema);
