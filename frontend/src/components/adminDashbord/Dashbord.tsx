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
      id: data?.selectedUser,
      role: data.role,
    };
    try {
      // const response = await axios.post('http://localhost:5000/makeadmin', {
      //   withCredentials: true,
      //   body : {
      //     id : data.id,
      //     role : data.role
      //   }
      // });

      const response: any = await axios({
        method: 'post',
        url: 'http://localhost:5000/makeadmin',
        withCredentials: true,
        data: payload,
      });

      console.log(response);
    } catch (error) {
      console.error('Error fetching user data', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border p-4">
          <h2 className="text-xl font-bold">User List</h2>
          <ul className="list-disc list-inside mt-2">
            {userList?.map((user) => (
              <li key={user._id} className="text-lg">
                {user.username}
                <span className="ml-5" style={{ color: 'orange' }}>
                  {user.role}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border p-4">
          <h2 className="text-xl font-bold">Submit Data</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Select User */}
            <div className="mb-4">
              <label
                htmlFor="userSelect"
                className="block text-sm font-medium text-gray-700"
              >
                Select User
              </label>
              <select
                id="userSelect"
                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
                {...register('selectedUser', {
                  required: 'Please select a user',
                })}
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
              <p className="text-red-500 text-sm">{errors.selectedUser.message}</p>
            )} */}
            </div>

            {/* Select Role */}
            <div className="mb-4">
              <label
                htmlFor="roleSelect"
                className="block text-sm font-medium text-gray-700"
              >
                Select Role
              </label>
              <select
                id="roleSelect"
                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
                {...register('role', { required: 'Please select a role' })}
              >
                <option value="">Select a role</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
              {/* Display error message if role is not selected */}
              {/* {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>} */}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-200"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
