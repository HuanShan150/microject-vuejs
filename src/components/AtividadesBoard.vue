<template>
  <div class="board">
    <div v-if="projetoId" class="header">
      <div class="header-content">
        <h3>{{ clienteNome }} / {{ projetoNome }}</h3>
        <button class="btn btn-primary" @click="showAtividadeForm = true">+ Adicionar Atividade</button>
      </div>
    </div>
    <div class="columns">
      <div class="column p-2 mr-2 flex-grow-1">
        <h5>Backlog</h5>
        <div v-if="backlog.length === 0" class="empty-column">Nenhuma atividade</div>
        <div class="atividade-box mb-2" v-for="item in backlog" :key="item.id" @click="verDetalhes(item)">
          <div class="atividade-body">
            <h6 class="atividade-title">{{ item.descricao }}</h6>
          </div>
        </div>
      </div>
      <div class="column p-2 mr-2 flex-grow-1">
        <h5>Em andamento</h5>
        <div v-if="emProgresso.length === 0" class="empty-column">Nenhuma atividade</div>
        <div class="atividade-box mb-2" v-for="item in emProgresso" :key="item.id" @click="verDetalhes(item)">
          <div class="atividade-body">
            <h6 class="atividade-title">{{ item.descricao }}</h6>
          </div>
        </div>
      </div>
      <div class="column p-2 mr-2 flex-grow-1">
        <h5>Em revis&atilde;o</h5>
        <div v-if="emRevisao.length === 0" class="empty-column">Nenhuma atividade</div>
        <div class="atividade-box mb-2" v-for="item in emRevisao" :key="item.id" @click="verDetalhes(item)">
          <div class="atividade-body">
            <h6 class="atividade-title">{{ item.descricao }}</h6>
          </div>
        </div>
      </div>
      <div class="column p-2 flex-grow-1">
        <h5>Conclu&iacute;do</h5>
        <div v-if="concluido.length === 0" class="empty-column">Nenhuma atividade</div>
        <div class="atividade-box mb-2" v-for="item in concluido" :key="item.id" @click="verDetalhes(item)">
          <div class="atividade-body">
            <h6 class="atividade-title">{{ item.descricao }}</h6>
          </div>
        </div>
      </div>
    </div>
    <AtividadeForm v-if="showAtividadeForm" :projeto-id="projetoId" @close="showAtividadeForm = false" @atividade-adicionada="fetchAtividades(projetoId)" />
  </div>
</template>

<script>
import { getAtividadesByProjeto } from '../services/api';
import AtividadeForm from './AtividadeForm.vue';

export default {
  name: 'AtividadesBoard',
  components: { AtividadeForm },
  props: {
    projetoId: {
      type: Number,
      required: false,
      default: null
    },
    clienteNome: {
      type: String,
      required: false,
      default: ''
    },
    projetoNome: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      backlog: [],
      emProgresso: [],
      emRevisao: [],
      concluido: [],
      showAtividadeForm: false,
    };
  },
  watch: {
    projetoId: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.fetchAtividades(newVal);
        } else {
          this.backlog = [];
          this.emProgresso = [];
          this.emRevisao = [];
          this.concluido = [];
        }
      }
    }
  },
  methods: {
    async fetchAtividades(projetoId) {
      try {
        const atividades = await getAtividadesByProjeto(projetoId);
        this.backlog = atividades.filter(item => item.status === 'BACKLOG');
        this.emProgresso = atividades.filter(item => item.status === 'EM_ANDAMENTO');
        this.emRevisao = atividades.filter(item => item.status === 'EM_REVISAO');
        this.concluido = atividades.filter(item => item.status === 'CONCLUIDO');
      } catch (error) {
        console.error('Erro ao buscar atividades:', error);
      }
    },
    verDetalhes(atividade) {
      const atividadeDetalhes = {
        ...atividade,
        projetoNome: this.projetoNome,
        clienteNome: this.clienteNome
      };
      this.$emit('ver-detalhes', atividadeDetalhes);
    }
  }
};
</script>

<style scoped>
.board {
  display: flex;
  flex-direction: column;
  height: 100vh;
  flex-grow: 1;
  background-color: #f8f9fa; /* Mesma cor do fundo das colunas */
}
.header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}
.header-content {
  display: flex;
  align-items: center;
  gap: 50px;
}
.columns {
  display: flex;
  flex-grow: 1;
  overflow-y: auto;
}
.column {
  flex: 1;
  min-width: 250px;
  background-color: #f8f9fa; /* Mesma cor do fundo das colunas */
}
.atividade-box {
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  padding: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}
.atividade-box:hover {
  background-color: #f1f1f1;
}
.atividade-body {
  display: flex;
  flex-direction: column;
}
.atividade-title {
  font-size: 1rem;
  font-weight: 500;
}
.empty-column {
  text-align: center;
  color: #aaa;
  padding: 1rem;
}
</style>
