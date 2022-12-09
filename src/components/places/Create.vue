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
                            <h2 class="h4">Create new Place</h2>
                        </div>
                    </div>

                    <form class="needs-validation" novalidate action="campaigns/detail.html">

                        <div class="row">
                            <div class="col-12 col-lg-4 mb-3">
                                <label for="inputName">Name</label>
                                <!-- adding the class is-invalid to the input, shows the invalid feedback below -->
                                <input type="text" v-model="dataForm.name" class="form-control" id="inputName" name="name"
                                    placeholder="" value=""
                                    :class="{'is-invalid': validateError.name !=  ''}"
                                    >
                                <div class="invalid-feedback">
                                    {{validateError.name}}
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12 col-lg-4 mb-3">
                                <label for="selectChannel">Area</label>
                                <select v-model="dataForm.area_id" class="form-control" id="selectChannel" name="channel"
                                :class="{'is-invalid': validateError.area_id !=  ''}"
                                >
                                    <option v-for="item in dataAreas" :index="item.id" :value="item.id">{{ item.name }}
                                    </option>
                                </select>
                                <div class="invalid-feedback">
                                    {{validateError.area_id}}
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12 col-lg-4 mb-3">
                                <label for="inputCapacity">Capacity</label>
                                <input type="number"   v-model="dataForm.capacity" class="form-control" id="inputCapacity" name="capacity"
                                :class="{'is-invalid': validateError.capacity !=  ''}"

                                    placeholder="" value="">

                                    <div class="invalid-feedback">
                                    {{validateError.capacity}}
                                </div>
                            </div>
                        </div>

                        <hr class="mb-4">
                        <button class="btn btn-primary" type="button" @click="savePlace">Save place</button>
                        <a @click="back()" class="btn btn-link">Cancel</a>
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
                area_id: '',
                name: '',
                capacity: ''
            },
            validateError: {
                area_id: '',
                name: '',
                capacity: ''
            },
            dataAreas: []
        };
    },
    created() {
        this.getAreas();
    },
    mounted() {

    },
    computed: mapGetters(['getInfoUser', 'getToken']),
    methods: {
        back() {
            let id = this.$route.params.id;
            this.$router.push({ name: 'CampaignDetail', params: { id: id } })
        },
        savePlace() {
            let scop = this;
            scop.validateError.name = '';
            scop.validateError.area_id = '';
            scop.validateError.capacity = '';
            let id = scop.$route.params.id;
            axios.post('http://127.0.0.1:8000/api/place/create', scop.dataForm, {
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
                        scop.validateError.capacity = typeof error.response.data.data.capacity !== 'undefined' ? error.response.data.data.capacity[0] : '';
                        scop.validateError.area_id = typeof error.response.data.data.area_id !== 'undefined' ? error.response.data.data.area_id[0] : '';
                    }
                });
        },
        getAreas() {
            let scop = this;
            let id = scop.$route.params.id;
            let token = localStorage.getItem('token_login_hht');
            axios.get('http://127.0.0.1:8000/api/get-area/' + id, {
                headers: { "Authorization": token }
            })
                .then(function (response) {
                    if (response.data.status == 200) {
                        scop.dataAreas = response.data.data;
                    }
                })
                .catch(function (error) {

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