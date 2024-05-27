<template>
    <div class="detalhes" v-if="atividade">
      <div class="modal-header">
        <h5 class="modal-title">Detalhes da Atividade</h5>
        <button type="button" class="btn-close" @click="$emit('close')"></button>
      </div>
      <div class="modal-body">
        <div class="form-group">
            <p><strong>Descri&ccedil;&atilde;o:</strong> {{ atividade.descricao }}</p>
            <p><strong>Projeto:</strong> {{ atividade.projetoNome }}</p>
            <p><strong>Cliente:</strong> {{ atividade.clienteNome}}</p>
            <label for="status"><strong>Status</strong></label>
            <select id="status" v-model="status" class="form-control">
                <option value="BACKLOG">Backlog</option>
                <option value="EM_ANDAMENTO">Em andamento</option>
                <option value="EM_REVISAO">Em revis&atilde;o</option>
                <option value="CONCLUIDO">Conclu&iacute;do</option>
            </select>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { editarAtividade } from '../services/api';
  
  export default {
    name: 'AtividadeDetalhes',
    props: {
      atividade: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        status: this.atividade.status
      };
    },
    methods: {
      async atualizarStatus() {
        try {
          const atividadeAtualizada = {
            id: this.atividade.id,
            descricao: this.atividade.descricao,
            status: this.status
          };
          const updatedAtividade = await editarAtividade(atividadeAtualizada);
          this.$emit('status-atualizado', updatedAtividade);
        } catch (error) {
          console.error('Erro ao atualizar status da atividade:', error);
        }
      }
    },
    watch: {
      status(newStatus) {
          this.atualizarStatus();
      }
    }
  };
  </script>
  
  <style scoped>
  .detalhes {
    padding: 10px;
    background-color: #fff;
    border-left: 1px solid #ccc;
    height: 100vh;
  }
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .modal-body {
    margin-top: 20px;
  }
  .form-group {
    margin-bottom: 1rem;
  }
  .form-control {
    width: 100%;
    padding: 0.5rem;
    margin-top: 0.25rem;
  }
  </style>
  