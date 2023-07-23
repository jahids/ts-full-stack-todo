
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

interface UserData {
  _id: string;
  username: string;
  role: string;
  // Add other user properties here as needed
}

const Dashboard: React.FC = () => {
  const { control, handleSubmit, register } = useForm();
  const [userList, setUserList] = useState<UserData[]>([]);

  // Fetch user data from the API using useEffect
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/alluser', {
          withCredentials: true,
        });
        setUserList(response.data.alluser);
        console.log(response);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUserData();
  }, []);

  // Handle form submit
  const onSubmit = async (data: any) => {
    console.log(data);
   // http://localhost:5000/makeadmin
   const payload = {
          id : data?.selectedUser,
        role : data.role
   }
   try {
    // const response = await axios.post('http://localhost:5000/makeadmin', {
    //   withCredentials: true,
    //   body : {
    //     id : data.id,
    //     role : data.role
    //   }
    // });


    const response : any = await axios({
        method: 'post',
        url: 'http://localhost:5000/makeadmin',
        withCredentials: true,
        data: payload
      });
   
    console.log(response);
  } catch (error) {
    console.error('Error fetching user data', error);
  }
  };

  return (
    <div className="container mt-5">
      <h1>Dashboard</h1>

      <div className="row">
        <div className="col-md-6">
          <h2>User List</h2>
          <ul className="list-group">
            {userList?.map((user) => (
              <li key={user._id} className="list-group-item">
                {user.username} 
                <span className='p-5' style={{color : "orange"}}>{user.role}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-md-6">
          <h2>Submit Data</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Select User */}
            <div className="mb-3">
              <label htmlFor="userSelect" className="form-label">
                Select User
              </label>
              <select
                id="userSelect"
                className="form-select form-select-lg"
                {...register('selectedUser', { required: 'Please select a user' })}
              >
                <option value="">Select a user</option>
                {userList.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.username}
                  </option>
                ))}
              </select>
              {/* Display error message if user is not selected */}
              {/* {errors.selectedUser && (
                <div className="invalid-feedback">Please select a user</div>
              )} */}
            </div>

            {/* Select Role */}
            <div className="mb-3">
              <label htmlFor="roleSelect" className="form-label">
                Select Role
              </label>
              <select
                id="roleSelect"
                className="form-select form-select-lg"
                {...register('role', { required: 'Please select a role' })}
              >
                <option value="">Select a role</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
              {/* Display error message if role is not selected */}
              {/* {errors.role && <div className="invalid-feedback">Please select a role</div>} */}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
