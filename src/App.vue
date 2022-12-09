<template>
  <div id="app">
    <div v-if="getLoading" class="container-loader">
      <div class="loader"></div>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import axios from 'axios';

export default {
  name: 'App',
  created() {
    this.getStatusAuth();
  },
  watch: {
    $route(to, from) {
      if (from.name == 'CampaignIndex') {
        this.getStatusAuth();
      }
    }
  },
  computed: mapGetters(['getLoading']),
  methods: {
    ...mapMutations(['PUSH_TOKEN', 'CHANGE_STATUS_AUTH', 'CHANGE_LOADING', 'PUSH_INFOR_USER']),
    getStatusAuth() {
      let scop = this;
      scop.CHANGE_LOADING(true);
      let token = localStorage.getItem('token_login_hht');
      if (token != null) {
        axios
          .get('http://127.0.0.1:8000/api/get-user/', {
            headers: { "Authorization": token }
          })
          .then(function (response) {
            if (response.status == 200) {
              scop.PUSH_TOKEN(token);
              scop.CHANGE_STATUS_AUTH(true);
              scop.CHANGE_LOADING(false);
              scop.PUSH_INFOR_USER(response.data.data);
              if (scop.$route.name == 'Login') {
                scop.$router.push({ name: 'CampaignIndex' })
              }
            }
          }).catch(function (error) {
            scop.$router.push({ name: 'Login' })
            scop.PUSH_TOKEN('');
            scop.CHANGE_STATUS_AUTH(false);
            scop.CHANGE_LOADING(false);
          })
      } else {
        scop.CHANGE_LOADING(false);
      }
    }
  }
}
</script>

<style>
@import './assets/dist/Chart.min.css';
@import './assets/css/custom.css';
@import './assets/css/custom.css';


.container-loader {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: white;
  z-index: 999;
}

.loader {
  position: absolute;
  border: 4px solid #f3f3f3;
  /* Light grey */
  border-top: 4px solid #3498db;
  /* Blue */
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 2s linear infinite;
  top: 50%;
  left: 50%;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.poin {
  cursor: pointer;
}
</style>
