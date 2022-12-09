<template>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a class="navbar-brand col-sm-3 col-md-2 mr-0 poin text-white" @click="backHome">CVC Platform</a>
        <span class="navbar-organizer w-100">{{ getInfoUser.name }}</span>
        <ul class="navbar-nav px-3">
            <li class="nav-item text-nowrap">
                <a class="nav-link poin" @click="logout" id="logout">Sign out</a>
            </li>
        </ul>
    </nav>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapMutations } from 'vuex'

export default {
    name: 'HeaderCampaign',

    data() {
        return {
            
        };
    },

    mounted() {

    },
    computed: mapGetters(['getInfoUser', 'getToken']),
    methods: {
        ...mapMutations(['PUSH_TOKEN', 'CHANGE_STATUS_AUTH', 'PUSH_INFOR_USER']),
        logout() {
            let scop = this;
            axios
                .get('http://127.0.0.1:8000/api/logout', {
                    headers: { "Authorization": scop.getToken }
                })
                .then(function (response) {
                    if (response.status == 200) {
                        localStorage.removeItem('token_login_hht')
                        scop.$router.push({ name: 'Login' })
                        scop.PUSH_TOKEN(null);
                        scop.CHANGE_STATUS_AUTH(false);
                        scop.PUSH_INFOR_USER([]);
                    }
                }).catch(function (error) {

                })
        },
        backHome() {
            this.$router.push({ name: 'CampaignIndex' })
        }
    },

};
</script>

<style scoped>

</style>