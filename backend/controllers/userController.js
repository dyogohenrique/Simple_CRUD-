const User = require('../models/user');

const validateCPF = (cpf) => {
  const regex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
  return regex.test(cpf);
};

const validateTelefone = (telefone) => {
  const regex = /^\(\d{2}\) \d{5}\-\d{4}$/;
  return regex.test(telefone);
};

const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

const validateCEP = (cep) => {
  const regex = /^\d{5}\-\d{3}$/;
  return regex.test(cep);
};

module.exports = {
  
  async createUser(req, res) {
    try {
      const { nome, cpf, dataNascimento, telefone, email, cep, endereco } = req.body;

      if (!nome || !cpf || !dataNascimento) {
        return res.status(400).json({ error: 'Os campos nome, cpf e data de nascimento são obrigatórios.' });
      }

      if (!validateCPF(cpf)) {
        return res.status(400).json({ error: 'CPF inválido. O formato deve ser 123.456.789-00.' });
      }

      if (telefone && !validateTelefone(telefone)) {
        return res.status(400).json({ error: 'Telefone inválido. O formato deve ser (12) 34567-8901.' });
      }

      if (email && !validateEmail(email)) {
        return res.status(400).json({ error: 'E-mail inválido. Verifique o formato.' });
      }

      if (cep && !validateCEP(cep)) {
        return res.status(400).json({ error: 'CEP inválido. O formato deve ser 12345-678.' });
      }

      const newUser = await User.create({ nome, cpf, dataNascimento, telefone, email, cep, endereco });
      res.status(201).json({ message: 'Usuário criado com sucesso.', user: newUser });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar usuário.', details: error.message });
    }
  },

  async getAllUsers(req, res) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar usuários.', details: error.message });
    }
  },

  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar usuário.', details: error.message });
    }
  },

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { nome, cpf, dataNascimento, telefone, email, cep, endereco } = req.body;

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      if (!validateCPF(cpf)) {
        return res.status(400).json({ error: 'CPF inválido. O formato deve ser 123.456.789-00.' });
      }

      if (telefone && !validateTelefone(telefone)) {
        return res.status(400).json({ error: 'Telefone inválido. O formato deve ser (12) 34567-8901.' });
      }

      if (email && !validateEmail(email)) {
        return res.status(400).json({ error: 'E-mail inválido. Verifique o formato.' });
      }

      if (cep && !validateCEP(cep)) {
        return res.status(400).json({ error: 'CEP inválido. O formato deve ser 12345-678.' });
      }

      await user.update({ nome, cpf, dataNascimento, telefone, email, cep, endereco });
      res.json({ message: 'Usuário atualizado com sucesso.', user });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar usuário.', details: error.message });
    }
  },

  async deleteUser(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      await user.destroy();
      res.json({ message: 'Usuário deletado com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar usuário.', details: error.message });
    }
  },
};
