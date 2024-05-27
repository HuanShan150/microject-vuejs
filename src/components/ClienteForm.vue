<template>
  <div class="modal-backdrop">
    <div class="modal fade show" tabindex="-1" style="display: block;" aria-modal="true" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Cadastrar Cliente</h5>
            <button type="button" class="btn-close" @click="$emit('close')"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitForm">
              <div class="form-group mb-3">
                <label for="nome">Nome</label>
                <input type="text" id="nome" v-model="nome" required class="form-control" />
              </div>
              <div class="form-group mb-3">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="email" required class="form-control" />
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
import { addCliente } from '../services/api';

export default {
  data() {
    return {
      nome: '',
      email: ''
    };
  },
  methods: {
    async submitForm() {
      try {
        await addCliente({ nome: this.nome, email: this.email });
        this.$emit('cliente-adicionado');
        this.$emit('close');
      } catch (error) {
        console.error('Erro ao adicionar cliente:', error);
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
