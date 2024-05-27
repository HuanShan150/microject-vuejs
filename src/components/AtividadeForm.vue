<template>
    <div class="modal fade show" tabindex="-1" style="display: block;" aria-modal="true" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Cadastrar Atividade</h5>
            <button type="button" class="btn-close" @click="$emit('close')"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitForm">
              <div class="form-group mb-3">
                <label for="descricao">Descri&ccedil;&atilde;o</label>
                <input type="text" id="descricao" v-model="descricao" required class="form-control" />
              </div>
              <div class="form-group mb-3">
                <label for="status">Status</label>
                <select id="status" v-model="status" required class="form-control">
                  <option value="BACKLOG">Backlog</option>
                  <option value="EM_ANDAMENTO">Em andamento</option>
                  <option value="EM_REVISAO">Em revis&atilde;o</option>
                  <option value="CONCLUIDO">Conclu&iacute;do</option>
                </select>
              </div>
              <div class="modal-footer">
                <button type="submit" class="btn btn-primary">Salvar</button>
                <button type="button" class="btn btn-secondary" @click="$emit('close')">Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { addAtividade } from '../services/api';
  
  export default {
    props: {
      projetoId: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        descricao: '',
        status: 'BACKLOG'
      };
    },
    methods: {
      async submitForm() {
        try {
          const novaAtividade = {
            descricao: this.descricao,
            status: this.status,
            projeto: {
              id: this.projetoId
            }
          };
          await addAtividade(novaAtividade);
          this.$emit('atividade-adicionada');
          this.$emit('close');
        } catch (error) {
          console.error('Erro ao adicionar atividade:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .modal {
    display: block;
    background: rgba(0, 0, 0, 0.5);
  }
  </style>
  