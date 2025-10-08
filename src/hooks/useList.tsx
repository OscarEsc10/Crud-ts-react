import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
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
        if (!response.ok) throw new Error("Error al cargar usuarios");
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

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "¿Are you sure?",
      text: "Are you sure you want to permanently delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${base_api}/${id}`, { method: "DELETE" })
          .then((response) => {
            if (!response.ok) throw new Error("Error trying to delete the user");
            return response.json();
          })
          .then(() => {
            setUsers((prev) => prev.filter((user) => user.id !== id));
            Swal.fire({
              title: "Deleted",
              text: "The user was deleted successfully.",
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            });
          })
          .catch((error) => {
            setError(error.message);
            Swal.fire({
              title: "Error",
              text: "The user could not be deleted.",
              icon: "error",
            });
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Canceled", "The user was not deleted.", "info");
      }
    });
  };

  const handleUpdate = (user: User) => {
    Swal.fire({
      title: `Update user #${user.id}`,
      html: `
        <input id="name" class="swal2-input" placeholder="Nombre" value="${user.name}">
        <input id="email" class="swal2-input" placeholder="Email" value="${user.email}">
        <select id="role" class="swal2-select">
          <option value="admin" ${user.role === "admin" ? "selected" : ""}>Admin</option>
          <option value="editor" ${user.role === "editor" ? "selected" : ""}>Editor</option>
          <option value="viewer" ${user.role === "viewer" ? "selected" : ""}>Viewer</option>
        </select>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Save changes",
      cancelButtonText: "Cancel",
      preConfirm: () => {
        const name = (document.getElementById("name") as HTMLInputElement).value;
        const email = (document.getElementById("email") as HTMLInputElement).value;
        const role = (document.getElementById("role") as HTMLSelectElement).value;

        if (!name || !email) {
          Swal.showValidationMessage("All fields are required");
          return;
        }

        return { name, email, role };
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const updatedUser = { ...user, ...result.value };

        fetch(`${base_api}/${user.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedUser),
        })
          .then((response) => {
            if (!response.ok) throw new Error("Error updating user");
            return response.json();
          })
          .then((data) => {
            console.log("Server response:", data);

            const updatedUserFromServer = data?.user;

            const safeUser = updatedUserFromServer ?? updatedUser;

            setUsers((prev) =>
              prev.map((u) => (u.id === user.id ? safeUser : u))
            );

            Swal.fire({
              title: "Updated",
              text: "The user was updated successfully.",
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            });
          })
          .catch((error) => {
            console.error("Error updating user:", error);
            Swal.fire({
              title: "Error",
              text: "The user was not updated.",
              icon: "error",
            });
          });
      }
    });
  };

  // 🧩 Render principal
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
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Last Login</th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-blue-50 transition-colors duration-200">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
              <td
                className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${
                  user.role === "admin"
                    ? "text-red-600"
                    : user.role === "editor"
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                {user.role}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(user.lastLogin).toLocaleDateString()}
              </td>
              <td>
                <button
                  onClick={() => handleDelete(user.id)}
                  type="button"
                  className="focus:outline-none text-white cursor-pointer bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                >
                  Delete
                </button>

                <button
                  onClick={() => handleUpdate(user)}
                  type="button"
                  className="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
