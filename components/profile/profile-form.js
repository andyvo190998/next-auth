import axios from 'axios';
import { useRef } from 'react';
import classes from './profile-form.module.css';

function ProfileForm() {
  const oldPassword = useRef();
  const newPassword = useRef();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const updatePassword = {
      oldPassword: oldPassword.current.value,
      newPassword: newPassword.current.value,
    };

    axios
      .patch('/api/user/change-password', updatePassword)
      .then(() => alert('successful'))
      .catch(() => alert('fail'));
  };

  return (
    <form onSubmit={handleOnSubmit} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='old-password'>Old Password</label>
        <input ref={oldPassword} type='password' id='old-password' />
      </div>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input ref={newPassword} type='password' id='new-password' />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
