import React, { useEffect } from 'react';
import { get } from '../services/ApiEndpoint';

const Admin = () => {
  useEffect(() => {
    const GetUser = async () => {
      try {
        const request = await get('/api/admin/getuser');
        const response = request.data;
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    GetUser();
  }, []);
  return <div>Admin</div>;
};

export default Admin;
