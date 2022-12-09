<template>
    <div>
        <header-campaign></header-campaign>

        <div class="container-fluid">
            <div class="row">
                <nav class="col-md-2 d-none d-md-block bg-light sidebar">
                    <div class="sidebar-sticky">
                        <ul class="nav flex-column">
                            <li class="nav-item"><a class="nav-link active" href="campaign/index.html">Manage
                                    Campaigns</a></li>
                        </ul>
                    </div>
                </nav>

                <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
                    <div
                        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 class="h2">Manage Campaigns</h1>
                        <div class="btn-toolbar mb-2 mb-md-0">
                            <div class="btn-group mr-2">
                                <a class="btn btn-sm btn-outline-secondary poin" @click="createNewCampaign">Create new
                                    campaigns</a> 
                            </div>
                        </div>
                    </div>

                    <div class="row campaign">
                        <div v-for="item in dataCampaigns" :index="item.id" class="col-md-4">
                            <div class="card mb-4 shadow-sm">
                                <a @click="detailCampaign(item.id)" class="btn text-left campaign poin">
                                    <div class="card-body">
                                        <h5 class="card-title">{{item.name}}</h5>
                                        <p class="card-subtitle">{{item.date}}</p>
                                        <hr>
                                        <p class="card-text">3,546 registrations</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>

                </main>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';
import HeaderCampaign from '@/components/layout/HeaderCampaign';

export default {
    name: 'CampaignIndex',
    created() {
        let scop = this;
        scop.getCampaigns();
    },
    data() {
        return {
            dataCampaigns: [],
        };
    },
    mounted() {
    },
    methods: {
        getCampaigns() {
            let scop = this;
            let token = localStorage.getItem('token_login_hht');
            axios
                .get('http://127.0.0.1:8000/api/campaign', {
                    headers: { "Authorization": token }
                })
                .then(function (response) {
                    if (response.status == 200) {
                        scop.dataCampaigns = response.data.data;
                    }
                }).catch(function (error) {

                })
        }, 
        detailCampaign(id) {
            this.$router.push({ name: 'CampaignDetail' , params: {id: id}})
        },
        createNewCampaign() {
            this.$router.push({ name: 'CampaignCreate' })
        }
    },
    components: {
        HeaderCampaign
    }
};
</script>

<style scoped>

</style>