import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import TodosView from "../views/TodosView.vue";
import TodosDetail from "../views/TodosDetail.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Todos",
    component: TodosView,
  },
  {
    path: "/:id",
    name: "TodosDetail",
    component: TodosDetail,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
