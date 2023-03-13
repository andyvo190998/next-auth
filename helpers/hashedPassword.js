import { compare, hash } from 'bcryptjs';

const hashedPassword = async (password) => {
  const hashedPassword = await hash(password, 12);

  return hashedPassword;
};

export const isValid = async (password, hashedPassword) => {
  const isValid = await compare(password, hashedPassword);
  console.log(isValid);

  return isValid;
};

export default hashedPassword;
