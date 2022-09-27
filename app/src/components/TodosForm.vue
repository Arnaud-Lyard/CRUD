<template>
  <div class="form">
    <form @submit.prevent="todoCreate">
      <label for="title">Titre de la todo</label>
      <input type="text" name="title" v-model="title" />

      <label for="description">Contenu de la todo</label>
      <textarea
        name="description"
        id=""
        cols="30"
        rows="10"
        v-model="description"
      ></textarea>

      <button type="submit">Enregistrer</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useMutation, useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";

const TODOS_QUERY = gql`
  query getAllTodos {
    todosList {
      id
      title
      description
    }
  }
`;

const { result } = useQuery(TODOS_QUERY);

const title = ref("");
const description = ref("");

const { mutate: todoCreate } = useMutation(
  gql`
    mutation todoCreate($title: String!, $description: String!) {
      todoCreate(input: { title: $title, description: $description }) {
        todo {
          id
          title
          description
        }
      }
    }
  `,
  () => ({
    variables: {
      title: title.value,
      description: description.value,
    },
    update: (cache, { data: { todoCreate } }) => {
      let data = cache.readQuery({ query: TODOS_QUERY });
      data = {
        ...data,
        todosList: [...data.todosList, todoCreate],
      };
      cache.writeQuery({ query: TODOS_QUERY, data });
    },
  })
);
</script>

<style scoped>
.form {
  width: 400px;
  padding: 20px;
}
label,
input {
  display: block;
  font-size: 1.2em;
}
input {
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}
form button {
  border: 0;
  background-color: rgb(0, 189, 223);
  color: #fff;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2em;
}
form button:hover {
  background-color: rgb(0, 217, 255);
  transition: 0.3s;
}
textarea {
  width: 392px;
  height: 200px;
  margin-bottom: 20px;
}
</style>
