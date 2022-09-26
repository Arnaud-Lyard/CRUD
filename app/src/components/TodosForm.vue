<template>
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

      <button type="submit">Enregistrer</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const title = ref("");
const content = ref("");

// Post request with fetch
// TODO : Field should not not be empty
// const handleSubmit = () => {

//     const requestOptions = {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//             title: title.value,
//             content: content.value
//             })
//       };

//       fetch("http://localhost:8000/api/todos/", requestOptions)
//         .then(response => response.json())

//         title.value = "",
//         content.value= ""

// }
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
