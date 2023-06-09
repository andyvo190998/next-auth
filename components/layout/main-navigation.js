import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

import classes from './main-navigation.module.css';


function MainNavigation() {
  const { data: session } = useSession();
  const handleLogOut = async () => {
    await signOut();
  };
  return (
    <header className={classes.header}>
      <Link href='/'>
        <a>
          <div className={classes.logo}>Next Auth</div>
        </a>
      </Link>
      <nav>
        <ul>
          {!session && (
            <li>
              <Link href='/auth'>Login</Link>
            </li>
          )}
          {session && (
            <li>
              <Link href='/user'>User</Link>
            </li>
          )}
          {session && (
            <li>
              <Link href='/profile'>Profile</Link>
            </li>
          )}
          {session && (
            <li>
              <button onClick={handleLogOut}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
