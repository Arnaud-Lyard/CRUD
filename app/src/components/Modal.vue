<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="modal-header" id="modalTitle">
          <slot name="header">
            <h1>MODIFIER MA TO DO</h1>
          </slot>
          <button
            type="button"
            class="btn-close"
            @click="onClose"
            aria-label="Close modal"
          >
            x
          </button>
        </header>

        <section class="modal-body" id="modalDescription">
          <slot name="body">
            <div>
              <div class="form">
                <form @submit.prevent="handleSubmit">
                  <label for="title">Titre de la todo</label>
                  <input type="text" name="title" v-model="todoTitle" />

                  <label for="content">Contenu de la todo</label>
                  <textarea
                    name="content"
                    id=""
                    cols="30"
                    rows="10"
                    v-model="todoDescription"
                  ></textarea>

                  <button
                    @click="todoUpdate()"
                    class="button-submit"
                    type="submit"
                  >
                    Modifier
                  </button>
                  <button @click="todoDelete()" class="button-delete">
                    Supprimer
                  </button>
                  <button @click="onClose" class="button-cancel">Fermer</button>
                </form>
              </div>
            </div>
          </slot>
        </section>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { defineEmits } from "vue";
import { defineProps } from "vue";
import { ref } from "vue";
import { useMutation, useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";

const todoTitle = ref(props.title);
const todoDescription = ref(props.description);
const todoId = ref(props.id);

const props = defineProps({
  id: String,
  title: String,
  description: String,
});

const emit = defineEmits("close");
function onClose() {
  emit("close");
}

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

const { mutate: todoDelete, onDone } = useMutation(
  gql`
    mutation todoDelete($todoId: ID!) {
      todoDelete(todoId: $todoId) {
        todoId
      }
    }
  `,
  () => ({
    variables: {
      todoId: todoId.value,
    },
    update: (cache, { data: { todoDelete } }) => {
      let data = cache.readQuery({ query: TODOS_QUERY });
      data = {
        ...data,
        todosList: [...data.todosList, todoDelete],
      };
      cache.writeQuery({ query: TODOS_QUERY, data });
    },
  })
);

onDone(() => {
  onClose();
});

const { mutate: todoUpdate } = useMutation(
  gql`
    mutation todoUpdate($todoId: ID!, $title: String!, $description: String!) {
      todoUpdate(
        todoId: $todoId
        input: { title: $title, description: $description }
      ) {
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
      todoId: todoId.value,
      title: todoTitle.value,
      description: todoDescription.value,
    },
  })
);
</script>

<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  width: 1200px;
  height: 1000px;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: rgb(0, 217, 255);
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: rgb(0, 217, 255);
  background: transparent;
}

.btn-green {
  color: white;
  background: rgb(0, 217, 255);
  border: 1px solid rgb(0, 217, 255);
  border-radius: 2px;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}

h1 {
  color: rgb(0, 189, 223);
  text-align: center;
}
/* Form */
.form {
  max-width: 1000px;
  margin: 0 auto;
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
.button-submit {
  border: 0;
  background-color: rgb(0, 189, 223);
  color: #fff;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2em;
}
.button-submit:hover {
  background-color: rgb(0, 217, 255);
  transition: 0.3s;
}
.button-delete {
  border: 0;
  background-color: rgb(172, 0, 0);
  color: #fff;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2em;
  margin-left: 10px;
}
.button-delete:hover {
  background-color: rgb(238, 2, 2);
  transition: 0.3s;
}
.button-cancel {
  border: 0;
  background-color: rgb(152, 152, 152);
  color: #fff;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2em;
  margin-left: 10px;
}
.button-cancel:hover {
  background-color: rgb(197, 197, 197);
  transition: 0.3s;
}

textarea {
  width: 992px;
  height: 200px;
  margin-bottom: 20px;
}
@media (max-width: 1040px) {
  textarea {
    width: 100%;
  }
}
</style>
