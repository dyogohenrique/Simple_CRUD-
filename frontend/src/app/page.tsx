'use client'

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';
import { IUser, IFormData } from './components/types';

export default function Home() {
  const [formData, setFormData] = useState<IFormData>({
    nome: '',
    cpf: '',
    dataNascimento: '',
    telefone: '',
    email: '',
    cep: '',
    endereco: ''
  });

  const [users, setUsers] = useState<IUser[]>([]);
  const [message, setMessage] = useState<string>('');
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get<IUser[]>('http://localhost:5000/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao buscar os usuários', error);
    }
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    try {
      if (editingUser) {
        // Atualizar o usuário
        await axios.patch(`http://localhost:5000/users/atualizar/${editingUser.id}`, formData);
        setMessage('Usuário atualizado com sucesso!');
      } else {
        // Cadastrar novo usuário
        await axios.post('http://localhost:5000/users/criar', formData);
        setMessage('Usuário cadastrado com sucesso!');
      }
  
      setFormData({ nome: '', cpf: '', dataNascimento: '', telefone: '', email: '', cep: '', endereco: '' });
      setEditingUser(null);
      fetchUsers();
  
    } catch (error: any) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.error || 'Erro ao salvar usuário');
      } else {
        setMessage('Erro ao salvar usuário');
      }
    }
  };
  

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = (user: IUser) => {
    setEditingUser(user);
    setFormData({
      nome: user.nome,
      cpf: user.cpf,
      dataNascimento: user.dataNascimento,
      telefone: user.telefone,
      email: user.email,
      cep: user.cep,
      endereco: user.endereco
    });
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/users/delete/${id}`);
      setMessage('Usuário deletado com sucesso!');
      fetchUsers();
    } catch (error) {
      setMessage('Erro ao deletar usuário');
    }
  };

  const handleViewDetails = (user: IUser) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto">
        <UserForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} message={message} editingUser={!!editingUser} />
        <UserList users={users} handleEdit={handleEdit} handleDelete={handleDelete} handleViewDetails={handleViewDetails} />
        
        {/* Condicional para exibir o modal de detalhes do usuário */}
        <UserDetails selectedUser={selectedUser} closeModal={closeModal} />
      </div>
    </div>
  );
}
