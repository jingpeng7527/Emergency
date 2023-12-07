import Vue from "vue";
import Router from "vue-router";
import Login from "../components/Login.vue";
import Home from "../components/Home.vue";
import Super from "../components/Super.vue"
import Welcome from "../components/Welcome.vue";
import Welcome0 from "../components/Welcome0.vue";

import Events from "../components/staff/Events.vue";
import Resources from "../components/staff/Resources.vue";
import ResourcePlace from "../components/staff/ResourcePlace.vue";
import Company from "../components/staff/Company.vue";
import Flow from "../components/staff/Flow.vue"
import CityInfo from "../components/staff/CityInfo.vue"
import Commander from '../components/Commander.vue'
import AlarmManagement from '../components/command/AlarmManagement.vue'
import Emergency from '../components/command/Emergency.vue'
import Alarm from '../components/staff/Alarm.vue'
import Professor from "../components/Professor.vue";
import ProfessorTake from "../components/professor/ProfessorTake.vue";
import SuperManage from "../components/super/SuperManage.vue"

Vue.use(Router);

export default new Router({
  routes: [
    { path: "/", redirect: "/login" },
    { path: "/login", component: Login },
    {
      path: "/home",
      component: Home,
      redirect: "/welcome",
      children: [
      { path: "/welcome", component: Welcome }, 
      { path: "/1-1", component: Events},
      { path: "/1-2", component: Resources},
      { path: "/1-3", component: ResourcePlace},
      { path: "/1-4", component: Flow},
      { path: "/1-5", component: Company},
      { path: "/1-6", component: CityInfo},
      { path: '/1-7', component: Alarm}
      ],
    },

    {
      path: '/super',
      component: Super,
      redirect: "/welcome0",
      children: [
          { path: '/welcome0', component: Welcome},
          { path: '/0-1', component: SuperManage},
      ]
    },

    {
      path: '/commander',
      component: Commander,
      redirect: '/welcome1',
      children: [
          { path: '/welcome1', component: Welcome },
          { path: '/2-1', component: AlarmManagement},
          { path: '/2-2', component: Emergency}
      ]
    },
    {
      path: '/professor',
      component: Professor,
      redirect: '/welcome2',
      children: [
          { path: '/welcome2', component: Welcome },
          { path: '/3-1', component: ProfessorTake}
      ]
    }
  ],
});
