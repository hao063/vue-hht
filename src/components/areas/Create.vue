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
                    <sidebar></sidebar>

                    <div class="mb-3 pt-3 pb-2">
                        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
                            <h2 class="h4">Create new area</h2>
                        </div>
                    </div>
                    <form class="needs-validation" novalidate action="campaigns/detail.html">

                        <div class="row">
                            <div class="col-12 col-lg-4 mb-3">
                                <label for="inputName">Name</label>
                                <!-- adding the class is-invalid to the input, shows the invalid feedback below -->
                                <input type="text" v-model="dataForm.name" class="form-control" :class="{'is-invalid': validateError.name != ''}" id="inputName" name="name"
                                    placeholder="" value="">
                                <div class="invalid-feedback">
                                    {{validateError.name}}
                                </div>
                            </div>
                        </div>

                        <hr class="mb-4">
                        <button class="btn btn-primary" type="button" @click="saveArea">Save area</button>
                        <a @click="back" class="btn btn-link poin">Cancel</a>
                    </form>
                </main>

            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from '@/components/layout/detail/Sidebar';
import HeaderCampaign from '@/components/layout/HeaderCampaign';
import axios from 'axios';
import { mapGetters, mapMutations } from 'vuex'

export default {
    name: 'AreaCreate',

    data() {
        return {
            dataForm: {
                campaign_id: '',
                name: '',
            },
            validateError: {
                name: '',
            }
        };
    },

    mounted() {

    },
    computed: mapGetters(['getInfoUser', 'getToken']),
    methods: {
        back() {
            let id = this.$route.params.id;
            this.$router.push({ name: 'CampaignDetail', params: { id: id } })
        },
        saveArea() {
            let scop = this;
            scop.validateError.name = '';
            let id = scop.$route.params.id;
            scop.dataForm.campaign_id  = id;
            axios.post('http://127.0.0.1:8000/api/area/create', scop.dataForm, {
                headers: { "Authorization": scop.getToken }
            })
                .then(function (response) {
                    if (response.data.status == 200) {
                        alert('Tạo thành công');
                        scop.$router.push({ name: 'CampaignDetail', params: { id: id } })
                    }
                })
                .catch(function (error) {
                    if (error.response.data.status = 422) {
                        scop.validateError.name = typeof error.response.data.data.name !== 'undefined' ? error.response.data.data.name[0] : '';
                    }
                });
        }
    },
    components: {
        HeaderCampaign,
        Sidebar
    }
};
</script>

<style scoped>

</style>