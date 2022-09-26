<template>
  <div>
    <h1>MODIFIER MA TO DO</h1>
    <div class="form">
      <form @submit.prevent="handleSubmit">
        <label for="title">Titre de la todo</label>
        <input type="text" name="title" v-model="title" />

        <label for="content">Contenu de la todo</label>
        <textarea
          name="content"
          id=""
          cols="30"
          rows="10"
          v-model="content"
        ></textarea>

        <button class="button-submit" type="submit">Enregistrer</button>
        <button @click="handleDelete" class="button-delete">Supprimer</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();

const route = useRoute();
const id = route.params.id;

const error = ref("");
const title = ref("");
const content = ref("");

// Get request by id with fetch
fetch("http://localhost:8000/api/todos/" + id)
  .then((res) => res.json())
  .then((json) => {
    (title.value = json.title), (content.value = json.content);
  })
  .catch((err) => (error.value = err));

// Update request with fetch
const handleSubmit = () => {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: title.value,
      content: content.value,
    }),
  };

  fetch("http://localhost:8000/api/todos/" + id, requestOptions).then(
    (response) => response.json()
  );

  router.push({ name: "Todos" });
};

// Delete request with fetch
const handleDelete = () => {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };

  fetch("http://localhost:8000/api/todos/" + id, requestOptions).then(
    (response) => response.json()
  );

  router.push({ name: "Todos" });
};
</script>

<style scoped>
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
