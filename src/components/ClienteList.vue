<template>
  <div class="sidebar bg-light border-right p-3">
    <div class="accordion" id="accordionSidebar">
      <div v-for="cliente in clientes" :key="cliente.id" class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse' + cliente.id" aria-expanded="true">
            {{ cliente.nome }}
          </button>
        </h2>
        <div :id="'collapse' + cliente.id" class="accordion-collapse collapse">
          <div class="accordion-body">
            <ul class="nav flex-column">
              <li class="nav-item" v-for="projeto in cliente.projetos" :key="projeto.id">
                <a class="nav-link" href="#" @click="selectProjeto(cliente, projeto)">{{ projeto.nome }}</a>
              </li>
            </ul>
            <button class="btn btn-primary mt-2" @click="showProjetoForm(cliente.id)">+ Adicionar Projeto</button>
          </div>
        </div>
      </div>
    </div>
    <button class="btn btn-primary mt-3" @click="showClienteForm">+ Adicionar Cliente</button>
    
    <ClienteForm v-if="showClienteModal" @close="showClienteModal = false" @cliente-adicionado="fetchClientes" />
    <ProjetoForm v-if="showProjetoModal" :cliente-id="selectedClienteId" @close="closeProjetoForm" @projeto-adicionado="fetchClientes" />
  </div>
</template>

<script>
import { getClientes, getProjetosByCliente } from '../services/api';
import ClienteForm from './ClienteForm.vue';
import ProjetoForm from './ProjetoForm.vue';

export default {
  components: { ClienteForm, ProjetoForm },
  data() {
    return {
      clientes: [],
      showClienteModal: false,
      showProjetoModal: false,
      selectedClienteId: null
    };
  },
  methods: {
    async fetchClientes() {
      try {
        const clientes = await getClientes();
        const clientesComProjetos = await Promise.all(clientes.map(async cliente => {
          const projetos = await getProjetosByCliente(cliente.id);
          return { ...cliente, projetos };
        }));
        this.clientes = clientesComProjetos;
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    },
    showClienteForm() {
      this.showClienteModal = true;
    },
    showProjetoForm(clienteId) {
      this.selectedClienteId = clienteId;
      this.showProjetoModal = true;
    },
    closeProjetoForm() {
      this.showProjetoModal = false;
      this.fetchClientes();
    },
    selectProjeto(cliente, projeto) {
      this.$emit('projeto-selecionado', cliente, projeto);
    }
  },
  mounted() {
    this.fetchClientes();
  }
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 250px;
  height: 100vh;
  overflow-y: auto;
}
.nav-link {
  color: #000;
}
.nav-link:hover {
  color: #007bff;
}
</style>
