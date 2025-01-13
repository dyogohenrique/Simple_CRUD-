'use client'

import { FC } from 'react';
import { IUser } from './types';

interface UserListProps {
  users: IUser[];
  handleEdit: (user: IUser) => void;
  handleDelete: (id: number) => void;
  handleViewDetails: (user: IUser) => void;
}

const UserList: FC<UserListProps> = ({ users, handleEdit, handleDelete, handleViewDetails }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">Usuários Cadastrados</h2>

      {users.length === 0 ? (
        <p className="text-center text-gray-600">Nenhum usuário cadastrado ainda.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id} className="border-b border-gray-200 py-2">
              <p className="font-semibold">{user.nome}</p>
              <p className="text-gray-500">{user.email}</p>
              <div className="flex justify-between items-center mt-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Deletar
                </button>
                <button
                  onClick={() => handleViewDetails(user)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Visualizar Detalhes
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
