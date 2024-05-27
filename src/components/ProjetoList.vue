<template>
  <div>
    <ul class="nav flex-column">
      <li class="nav-item" v-for="projeto in projetos" :key="projeto.id">
        <a class="nav-link" href="#" @click="selectProjeto(projeto)">{{ projeto.nome }}</a>
      </li>
    </ul>
    <button class="btn btn-primary mt-2" @click="showProjetoForm = true">
      + Adicionar Projeto
    </button>
    <ProjetoForm 
      v-if="showProjetoForm" 
      @close="showProjetoForm = false" 
      @projeto-adicionado="fetchProjetos" 
      :cliente-id="clienteId" 
    />
  </div>
</template>

<script>
import { getProjetosByCliente } from '../services/api';
import ProjetoForm from './ProjetoForm.vue';

export default {
  components: { ProjetoForm },
  props: {
    clienteId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      projetos: [],
      showProjetoForm: false
    };
  },
  async created() {
    await this.fetchProjetos();
  },
  methods: {
    async fetchProjetos() {
      try {
        this.projetos = await getProjetosByCliente(this.clienteId);
      } catch (error) {
        console.error('Erro ao buscar projetos:', error);
      }
    },
    selectProjeto(projeto) {
      this.$emit('projeto-selecionado', projeto);
    }
  }
};
</script>

<style scoped>
.nav-link {
  color: #000;
}
.nav-link:hover {
  color: #007bff;
}
</style>
