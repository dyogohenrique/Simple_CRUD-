'use client'

import { FC, useState } from 'react';
import { IFormData } from './types';

interface UserFormProps {
  formData: IFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  message: string;
  editingUser: boolean;
}

const UserForm: FC<UserFormProps> = ({ formData, handleChange, handleSubmit, message, editingUser }) => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleErrorMessage = (error: string) => {
    setErrorMessage(error);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md mb-6 w-full mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">
        {editingUser ? 'Editar Usuário' : 'Cadastro de Usuário'}
      </h1>

      {message && (
        <div
          className={`text-center mb-4 ${message.includes('sucesso') ? 'text-green-500' : 'text-red-500'}`}
        >
          {message}
        </div>
      )}

      {errorMessage && (
        <div className="text-center mb-4 text-red-500">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="nome">
            Nome
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Digite seu nome"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="cpf">
            CPF
          </label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Digite seu CPF"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="dataNascimento">
            Data de Nascimento
          </label>
          <input
            type="date"
            id="dataNascimento"
            name="dataNascimento"
            value={formData.dataNascimento}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="telefone">
            Telefone
          </label>
          <input
            type="text"
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Digite seu telefone"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Digite seu e-mail"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="cep">
            CEP
          </label>
          <input
            type="text"
            id="cep"
            name="cep"
            value={formData.cep}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Digite seu CEP"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="endereco">
            Endereço
          </label>
          <input
            type="text"
            id="endereco"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Digite seu endereço"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 col-span-2"
        >
          {editingUser ? 'Atualizar' : 'Cadastrar'}
        </button>
      </form>

    </div>
  );
};

export default UserForm;
