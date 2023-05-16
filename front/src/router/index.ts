import { createWebHistory, createRouter } from "vue-router";
import BoardSetting from "@/views/BoardSetting.vue";
import ConnectionSetting from "@/views/ConnectionSetting.vue";
import GamePlay from "@/views/GamePlay.vue";

const routes = [
  {
    path: "/",
    name: "ConnectionSetting",
    component: ConnectionSetting,
  },
  {
    path: "/board",
    name: "BoardSetting",
    component: BoardSetting,
  },
  {
    path: "/game",
    name: "GamePlay",
    component: GamePlay,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;