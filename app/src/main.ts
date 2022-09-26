import App from "./App.vue";
import router from "./router";

import { createApp, provide, h } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import apolloClient from "../apolloClient";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
  faPen,
  faTrash,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(faPen, faTrash, faFloppyDisk);

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
});

app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router).mount("#app");
