<template>
    <div>
        <header-campaign></header-campaign>

        <div class="container-fluid">
            <div class="row">
                <nav class="col-md-2 d-none d-md-block bg-light sidebar">
                    <div class="sidebar-sticky">
                        <ul class="nav flex-column">
                            <li class="nav-item"><a class="nav-link active" href="campaigns/index.html">Manage
                                    Campaigns</a></li>
                        </ul>
                    </div>
                </nav>

                <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
                    <div
                        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 class="h2">Manage Campaigns</h1>
                    </div>

                    <div class="mb-3 pt-3 pb-2">
                        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
                            <h2 class="h4">Edit new campaign</h2>
                        </div>
                    </div>

                    <form class="needs-validation" novalidate>

                        <div class="row">
                            <div class="col-12 col-lg-4 mb-3">
                                <label for="inputName">Name</label>
                                <!-- adding the class is-invalid to the input, shows the invalid feedback below -->
                                <input type="text" class="form-control"
                                    :class="{ 'is-invalid': validateError.name != '' }" v-model="dataForm.name"
                                    id="inputName" name="name" placeholder="" value="">
                                <div class="invalid-feedback">
                                    {{ validateError.name }}
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12 col-lg-4 mb-3">
                                <label for="inputSlug">Slug</label>
                                <input type="text" class="form-control"
                                    :class="{ 'is-invalid': validateError.slug != '' }" id="inputSlug"
                                    v-model="dataForm.slug" name="slug" placeholder="" value="">
                                <div class="invalid-feedback">
                                    {{ validateError.slug }}
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12 col-lg-4 mb-3">
                                <label for="inputDate">Date</label>
                                <input type="text" class="form-control"
                                    :class="{ 'is-invalid': validateError.date != '' }" v-model="dataForm.date"
                                    id="inputDate" name="date" placeholder="yyyy-mm-dd" value="">
                                <div class="invalid-feedback">
                                    {{ validateError.date }}
                                </div>
                            </div>
                        </div>

                        <hr class="mb-4">
                        <button @click="saveCampaign" class="btn btn-primary" type="button">Save campaign</button>
                        <a @click="backCampaign" class="btn btn-link poin">Cancel</a>
                    </form>

                </main>
            </div>
        </div>
    </div>
</template>

<script>

import HeaderCampaign from '@/components/layout/HeaderCampaign';
import axios from 'axios';
import { mapGetters, mapMutations } from 'vuex'

export default {
    name: 'CampaignEdit',
    data() {
        return {
            dataForm: {
                name: '',
                slug: '',
                date: ''
            },
            validateError: {
                name: '',
                slug: '',
                date: ''
            }, 
        };
    },

    created() {
        this.getCampainEdit();
    },
    computed: mapGetters(['getInfoUser', 'getToken']),
    methods: {
        backCampaign() {
            this.$router.push({ name: 'CampaignIndex' })
        },
        saveCampaign() {
            let scop = this;
            scop.validateError.name = '';
            scop.validateError.slug = '';
            scop.validateError.date = '';
            let id = scop.$route.params.id;

            axios.post('http://127.0.0.1:8000/api/campaign/edit/'+id, scop.dataForm, {
                headers: { "Authorization": scop.getToken }
            })
                .then(function (response) {
                    if (response.data.status == 200) {
                        alert('Sửa thành công');
                        scop.$router.push({ name: 'CampaignDetail' , params: {id: id}})
                    }
                })
                .catch(function (error) {
                    if (error.response.data.status = 422) {
                        scop.validateError.name = typeof error.response.data.data.name !== 'undefined' ? error.response.data.data.name[0] : '';
                        scop.validateError.slug = typeof error.response.data.data.slug !== 'undefined' ? error.response.data.data.slug[0] : '';
                        scop.validateError.date = typeof error.response.data.data.date !== 'undefined' ? error.response.data.data.date[0] : '';
                    }
                });
        }, 
        getCampainEdit() {
            let scop = this;
            let id = scop.$route.params.id;
            let token = localStorage.getItem('token_login_hht');
            
            axios
                .get('http://127.0.0.1:8000/api/campaign/get-edit/'+id, {
                    headers: { "Authorization": token }
                })
                .then(function (response) {
                    if (response.status == 200) {
                        scop.dataForm.name = response.data.data.name;
                        scop.dataForm.slug = response.data.data.slug;
                        scop.dataForm.date = response.data.data.date;
                    }
                }).catch(function (error) {
                    
                })

        }
    },
    components: {
        HeaderCampaign
    }
};
</script>

<style scoped>

</style>