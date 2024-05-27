<template>
  <div class="modal-backdrop">
    <div class="modal fade show" tabindex="-1" style="display: block;" aria-modal="true" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Cadastrar Projeto</h5>
            <button type="button" class="btn-close" @click="$emit('close')"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitForm">
              <div class="form-group mb-3">
                <label for="nome">Nome</label>
                <input type="text" id="nome" v-model="nome" required class="form-control" />
              </div>
              <div class="form-group mb-3">
                <label for="descricao">Descri&ccedil;&atilde;o</label>
                <input type="text" id="descricao" v-model="descricao" required class="form-control" />
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
  </div>
</template>

<script>
import { addProjeto } from '../services/api';

export default {
  props: {
    clienteId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      nome: '',
      descricao: ''
    };
  },
  methods: {
    async submitForm() {
      try {
        const novoProjeto = {
          nome: this.nome,
          descricao: this.descricao,
          cliente: {
            id: this.clienteId
          },
          status: 'ABERTO'
        };
        await addProjeto(novoProjeto);
        this.$emit('projeto-adicionado');
        this.$emit('close');
      } catch (error) {
        console.error('Erro ao adicionar projeto:', error);
      }
    }
  }
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1050;
  background: rgba(0, 0, 0, 0.5);
}
.modal {
  display: block;
  z-index: 1060;
}
</style>
