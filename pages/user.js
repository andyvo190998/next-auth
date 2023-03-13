import React from 'react';

const UserPage = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      This is user page which is protected by authentication. You have to login
      to see this page.
    </div>
  );
};

export default UserPage;
UserPage.auth = true;
