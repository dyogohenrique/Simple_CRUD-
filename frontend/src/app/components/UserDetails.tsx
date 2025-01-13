'use client'

import { FC } from 'react';
import { IUser } from './types';

interface UserDetailsProps {
  selectedUser: IUser | null;
  closeModal: () => void;  // Função para fechar o modal
}

const UserDetails: FC<UserDetailsProps> = ({ selectedUser, closeModal }) => {
  if (!selectedUser) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h3 className="text-xl font-bold mb-4">Detalhes do Usuário</h3>
        <p><strong>Nome:</strong> {selectedUser.nome}</p>
        <p><strong>CPF:</strong> {selectedUser.cpf}</p>
        <p><strong>Data de Nascimento:</strong> {selectedUser.dataNascimento}</p>
        <p><strong>Telefone:</strong> {selectedUser.telefone}</p>
        <p><strong>E-mail:</strong> {selectedUser.email}</p>
        <p><strong>CEP:</strong> {selectedUser.cep}</p>
        <p><strong>Endereço:</strong> {selectedUser.endereco}</p>
        
        <button
          onClick={closeModal}
          className="mt-4 w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
