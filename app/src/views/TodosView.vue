<template>
  <h1>TO DO LIST</h1>
  <div class="container">
    <div class="left-content">
      <div v-if="error">Il y a eu une erreur...</div>
      <p v-if="loading">En cours de chargement...</p>
      <div v-else v-for="todo in result.todosList" :key="todo.id">
        <div class="todo-content">
          <span class="icon" @click="showModal"
            ><font-awesome-icon icon="fa-solid fa-pen"
          /></span>
          <Modal
            v-show="isModalVisible"
            @close="closeModal"
            :key="todo.id"
            :id="todo.id"
            :title="todo.title"
            :description="todo.description"
          />
          <h4>{{ todo.title }}</h4>
          <p>{{ todo.description }}</p>
        </div>
      </div>
    </div>
    <TodosForm />
  </div>
</template>
<script setup>
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";
import TodosForm from "@/components/TodosForm.vue";
import { ref } from "vue";
import Modal from "@/components/Modal.vue";
const isModalVisible = ref(false);
const showModal = () => {
  isModalVisible.value = true;
};
const closeModal = () => {
  isModalVisible.value = false;
};

const TODOS_QUERY = gql`
  query getAllTodos {
    todosList {
      id
      title
      description
    }
  }
`;

const { result, loading, error } = useQuery(TODOS_QUERY);
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap-reverse;
}
.left-content {
  justify-content: center;
  width: 1000px;
}
h1 {
  text-align: center;
  color: rgb(0, 189, 223);
}
.todo-content {
  position: relative;
  background: #fff;
  border-radius: 4px;
  margin: 20px auto;
  padding: 20px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
}
.todo-content h4 {
  color: rgb(0, 189, 223);
  font-size: 1.2em;
}
.icon {
  position: absolute;
  font-size: 18px;
  top: 20px;
  right: 20px;
  color: #000;
}
.icon:hover {
  color: rgb(0, 189, 223);
  transition: 0.3s;
}
</style>
