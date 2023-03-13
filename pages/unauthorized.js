import { useRouter } from 'next/router';
import React from 'react';
import Link from 'next/link';

const unauthorized = () => {
  const router = useRouter();
  const message = router.query.message;
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Access Denied</h1>
      {message && <div style={{ textAlign: 'center' }}>{message}</div>}
    </div>
  );
};

export default unauthorized;
