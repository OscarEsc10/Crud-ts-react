import React from "react";
import Swal from "sweetalert2" ;
import type{ SweetAlertResult } from "sweetalert2";
import withReactContent from "sweetalert2-react-content"; 
import { base_api } from "../hooks/useList"; 



// Define el tipo de usuario
export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  createdAt: string;
  lastLogin: string;
}

const MySwal = withReactContent(Swal);

interface AddUserButtonProps {
  onUserAdded: (user: User) => void;
}

const AddUserButton: React.FC<AddUserButtonProps> = ({ onUserAdded }) => {
  const handleAddUser = () => {
    MySwal.fire({
      title: "Add New User",
      html: `
        <input id="name" class="swal2-input" placeholder="Name" />
        <input id="email" class="swal2-input" placeholder="Email" type="email" />
        <select id="role" class="swal2-select">
          <option value="admin">Admin</option>
          <option value="editor">Editor</option>
          <option value="viewer" selected>Viewer</option>
        </select>
      `,
      showCancelButton: true,
      confirmButtonText: "Add User",
      cancelButtonText: "Cancel",
      preConfirm: () => {
        const name = (document.getElementById("name") as HTMLInputElement)?.value;
        const email = (document.getElementById("email") as HTMLInputElement)?.value;
        const role = (document.getElementById("role") as HTMLSelectElement)?.value;

        if (!name || !email || !role) {
          Swal.showValidationMessage("All fields are required");
          return;
        }

        return { name, email, role };
      },
    }).then((result: SweetAlertResult) => { // ✅ Tipado correcto
      if (result.isConfirmed && result.value) {
        const newUserData = {
          ...result.value,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        };

        fetch(base_api, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUserData),
        })
          .then((response) => {
            if (!response.ok) throw new Error("Error adding user");
            return response.json();
          })
          .then((data) => {
            const createdUser = data?.user ?? data;
            onUserAdded(createdUser);
            Swal.fire("Success", "User added successfully", "success");
          })
          .catch((error) => {
            console.error("Error adding user:", error);
            Swal.fire("Error", "Could not add user", "error");
          });
      }
    });
  };

  return (
    <button
      onClick={handleAddUser}
      className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-4"
    >
      + Add User
    </button>
  );
};

export default AddUserButton;
