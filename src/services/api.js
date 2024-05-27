import axios from '../axios';

export const getClientes = async () => {
  try {
    const response = await axios.get('/clientes');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    throw error;
  }
};

export const addCliente = async (cliente) => {
  try {
    const response = await axios.post('/clientes', cliente);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar cliente:', error);
    throw error;
  }
};

export const getProjetosByCliente = async (clienteId) => {
  try {
    const response = await axios.get(`/projetos/cliente/${clienteId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar projetos:', error);
    throw error;
  }
};

export const addProjeto = async (projeto) => {
  try {
    const response = await axios.post('/projetos', projeto);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar projeto:', error);
    throw error;
  }
};

export const getAtividadesByProjeto = async (projetoId) => {
  try {
    const response = await axios.get(`/atividades/projeto/${projetoId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar atividades:', error);
    throw error;
  }

};

export const addAtividade = async (atividade) => {
  try {
    const response = await axios.post('/atividades', atividade);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar atividade:', error);
    throw error;
  }
};

export const editarAtividade = async (atividade) => {
  try {
    const response = await axios.put(`/atividades/editar/${atividade.id}`, atividade);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar atividade:', error);
    throw error;
  }
};