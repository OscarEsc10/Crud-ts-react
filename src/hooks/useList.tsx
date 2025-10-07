import React, { useState, useEffect } from "react";

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  createdAt: string;
  lastLogin: string;
}

export const base_api = "http://localhost:3001/api/users";

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(base_api)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error while try to load users");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full divide-y divide-gray-200 shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Created</th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Last  Login</th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-blue-50 transition-colors duration-200">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
              <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${
                user.role === 'admin' ? 'text-red-600' :
                user.role === 'editor' ? 'text-yellow-600' :
                'text-green-600'
              }`}>
                {user.role}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(user.createdAt).toLocaleDateString()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(user.lastLogin).toLocaleDateString()}</td>
              <td className=""></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default UserList;
