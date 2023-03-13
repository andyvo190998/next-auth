import { useRef, useState } from 'react';
import classes from './auth-form.module.css';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const email = useRef();
  const password = useRef();
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputEmail = email.current.value;
    const inputPassword = password.current.value;

    const newUser = {
      email: inputEmail,
      password: inputPassword,
    };
    if (isLogin) {
      const result = await signIn('credentials', {
        redirect: false,
        email: inputEmail,
        password: inputPassword,
      });
      if (result.error) {
        alert(result.error);
        return;
      } else {
        router.push('/profile');
      }
    } else {
      axios
        .post('/api/auth/signIn', newUser)
        .then(() => alert('create user successfully'))
        .catch(() => alert('Email existed'));
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={handleSubmit}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input ref={email} type='email' id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input ref={password} type='password' id='password' required />
        </div>
        {/* {!isLogin && (
          <div className={classes.control}>
            <label htmlFor='password'>Repeat Your Password</label>
            <input
              ref={repeatPassword}
              type='password'
              id='password'
              required
            />
          </div>
        )} */}
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
