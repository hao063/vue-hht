<template>
  <div class="container-fluid">
    <div class="row">
      <main class="col-md-6 mx-sm-auto px-4">
        <div class="pt-3 pb-2 mb-3 border-bottom text-center">
          <h1 class="h2">The covid 19 vaccination campaign</h1>
        </div>
        <form class="form-signin" action="campains/index.html">

          <h1 v-if="dataError == ''" class="h3 mb-3 font-weight-normal">Please sign in</h1>
          <h1 v-else class="h3 mb-3 font-weight-normal text-danger">{{ dataError }}</h1>

          <label for="inputEmail" class="sr-only">Email</label>
          <input type="email" id="inputEmail" name="email" v-model="dataForm.email" class="form-control"
            :class="{ 'is-invalid': errorsValidate.errorEmail != '' }" placeholder="Email" autofocus>
          <div class="invalid-feedback">
            {{ errorsValidate.errorEmail }}
          </div>
          <label for="inputPassword" class="sr-only">Password</label>
          <input type="password" id="inputPassword" name="password" v-model="dataForm.password" class="form-control"
            :class="{ 'is-invalid': errorsValidate.errorPassword != '' }" placeholder="Password">

          <div class="invalid-feedback">
            {{ errorsValidate.errorPassword }}
          </div>
          <button class="btn btn-lg btn-primary btn-block mt-3" id="login" type="button" @click="loginPost">Sign
            in</button>
        </form>
      </main>
    </div>
  </div>

</template>

<script>
import axios from 'axios';
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Login',

  data() {
    return {
      dataForm: {
        email: "",
        password: ""
      },
      dataError: "",
      errorsValidate: {
        errorEmail: '',
        errorPassword: ''
      }
    };
  },
  computed: mapGetters(['getToken']),
  mounted() {

  },

  methods: {
    ...mapMutations(['PUSH_TOKEN', 'CHANGE_STATUS_AUTH', 'PUSH_INFOR_USER', 'CHANGE_LOADING']),
    loginPost() {
      let scop = this;
      scop.dataError = "";
      scop.errorsValidate.errorEmail = "";
      scop.errorsValidate.errorPassword = "";
      scop.CHANGE_LOADING(true);

      axios
        .post('http://127.0.0.1:8000/api/login', scop.dataForm)
        .then(function (response) {
          if (response.status == 200) {
            let token = response.data.data.token;
            scop.PUSH_TOKEN(token)
            localStorage.setItem('token_login_hht', token)
            scop.$router.push({ name: 'CampaignIndex' })
            scop.CHANGE_STATUS_AUTH(true);
            scop.PUSH_INFOR_USER(response.data.data);
          }
          scop.CHANGE_LOADING(false);
        }).catch(function (error) {
          scop.dataError = error.response.data.message;
          if (error.response.data.status == 422) {
            scop.errorsValidate.errorEmail = typeof error.response.data.data.email !== 'undefined' ? error.response.data.data.email[0] : '';
            scop.errorsValidate.errorPassword = typeof error.response.data.data.password !== 'undefined' ? error.response.data.data.password[0] : '';
          }
          scop.CHANGE_LOADING(false);
        })
    }
  },
};
</script>

<style scoped>

</style>