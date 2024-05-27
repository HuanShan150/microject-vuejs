<script setup>
import { ref } from 'vue';
import ClienteList from './components/ClienteList.vue';
import AtividadesBoard from './components/AtividadesBoard.vue';
import AtividadeDetalhes from './components/AtividadeDetalhes.vue';

const clienteSelecionado = ref(null);
const projetoSelecionado = ref(null);
const atividadeSelecionada = ref(null);
const atividadesBoardRef = ref(null);

const updateSelection = (cliente, projeto) => {
  clienteSelecionado.value = cliente;
  projetoSelecionado.value = projeto;
};

const verDetalhes = (atividade) => {
  console.log('Atividade selecionada:', atividade);
  atividadeSelecionada.value = atividade;
};

const fecharDetalhes = () => {
  atividadeSelecionada.value = null;
};

const atualizarAtividade = (atividadeAtualizada) => {
  if (atividadesBoardRef.value) {
    atividadesBoardRef.value.fetchAtividades(projetoSelecionado.value.id);
  }
};
</script>

<template>
  <div class="main-content">
    <div class="cliente-list">
      <ClienteList @projeto-selecionado="updateSelection"></ClienteList>
    </div>
    <div class="atividades-board">
      <AtividadesBoard 
        ref="atividadesBoardRef"
        :cliente-nome="clienteSelecionado?.nome" 
        :projeto-nome="projetoSelecionado?.nome" 
        :projeto-id="projetoSelecionado?.id"
        @ver-detalhes="verDetalhes"
      />
    </div>
    <div class="atividade-detalhes" v-if="atividadeSelecionada">
      <AtividadeDetalhes :atividade="atividadeSelecionada" @close="fecharDetalhes" @status-atualizado="atualizarAtividade" />
    </div>
  </div>
</template>

<style scoped>
html, body, #app, .main-content {
  height: 100%;
  margin: 0;
}

.main-content {
  display: flex;
  height: 100%;
}

.cliente-list {
  flex: 0 0 30%;
}

.atividades-board {
  flex: 0 0 50%;
}

.atividade-detalhes {
  flex: 0 0 43%;
}
</style>
