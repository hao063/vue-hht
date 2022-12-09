<template>
    <div>
        <header-campaign></header-campaign>

        <div class="container-fluid">
            <div class="row">
                <nav class="col-md-2 d-none d-md-block bg-light sidebar">
                    <div class="sidebar-sticky">
                        <ul class="nav flex-column">
                            <li class="nav-item"><a class="nav-link active">Manage
                                    Campaigns</a></li>
                        </ul>
                    </div>
                </nav>

                <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
                    <sidebar></sidebar>
                    <div class="mb-3 pt-3 pb-2">
                        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
                            <h2 class="h4">Create new session</h2>
                        </div>
                    </div>

                    <form class="needs-validation" novalidate action="campaigns/detail.html">

                        <div class="row">
                            <div class="col-12 col-lg-4 mb-3">
                                <label for="selectType">Type</label>
                                <select v-model="dataForm.type" class="form-control" id="selectType" name="type"
                                :class="{ 'is-invalid': validateError.type != '' }"
                                >
                                    <option value="1" selected>Normal</option>
                                    <option value="2">Service</option>
                                </select>
                                <div class="invalid-feedback">
                                    {{ validateError.type }}
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12 col-lg-4 mb-3">
                                <label for="inputTitle">Title</label>
                                <!-- adding the class is-invalid to the input, shows the invalid feedback below -->
                                <input type="text" v-model="dataForm.title" class="form-control"
                                    :class="{ 'is-invalid': validateError.title != '' }" id="inputTitle" name="title"
                                    placeholder="" value="">
                                <div class="invalid-feedback">
                                    {{ validateError.title }}
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12 col-lg-4 mb-3">
                                <label for="inputParticipant">Participant</label>
                                <input type="text" v-model="dataForm.vaccinate"
                                    :class="{ 'is-invalid': validateError.vaccinate != '' }" class="form-control"
                                    id="inputParticipant" name="participant" placeholder="" value="">
                                <div class="invalid-feedback">
                                    {{ validateError.vaccinate }}
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12 col-lg-4 mb-3">
                                <label for="selectPlace">Place</label>
                                <select v-model="dataForm.place_id" class="form-control" id="selectPlace" name="place"
                                    :class="{ 'is-invalid': validateError.place_id != '' }">
                                    <option v-for="itemPlace in dataPlaceAreas" :value="itemPlace.id">
                                        {{ itemPlace.place_name }} / {{ itemPlace.area_name }}</option>
                                </select>
                                <div class="invalid-feedback">
                                    {{ validateError.place_id }}
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12 col-lg-4 mb-3">
                                <label for="inputCost">Cost</label>
                                <input :disabled="dataForm.type == 1" :class="{ 'is-invalid': validateError.type != '' }"
                                    v-model="dataForm.cost" type="number" class="form-control" id="inputCost"
                                    name="cost" placeholder="" value="0">
                                <div class="invalid-feedback">
                                    {{ validateError.type }}
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12 col-lg-6 mb-3">
                                <label for="inputStart">Start</label>
                                <input v-model="dataForm.start" type="text"
                                    :class="{ 'is-invalid': validateError.start != '' }" class="form-control"
                                    id="inputStart" name="start" placeholder="yyyy-mm-dd HH:MM::SS" value="">
                                <div class="invalid-feedback">
                                    {{ validateError.start }}
                                </div>
                            </div>
                            <div class="col-12 col-lg-6 mb-3">
                                <label for="inputEnd">End</label>
                                <input v-model="dataForm.end" type="text" class="form-control" id="inputEnd" name="end"
                                    :class="{ 'is-invalid': validateError.end != '' }" placeholder="yyyy-mm-dd HH:MM::SS"
                                    value="">
                                <div class="invalid-feedback">
                                    {{ validateError.end }}
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12 mb-3">
                                <label for="textareaDescription">Description</label>
                                <textarea v-model="dataForm.description"
                                    :class="{ 'is-invalid': validateError.description != '' }" class="form-control"
                                    id="textareaDescription" name="description" placeholder="" rows="5"></textarea>
                                <div class="invalid-feedback">
                                    {{ validateError.description }}
                                </div>
                            </div>
                        </div>

                        <hr class="mb-4">
                        <button class="btn btn-primary" type="button" @click="saveSession">Save session</button>
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
                place_id: '',
                type: '',
                title: '',
                description: '',
                vaccinate: '',
                start: '',
                end: '',
                cost: '',
            },
            validateError: {
                place_id: '',
                type: '',
                title: '',
                description: '',
                vaccinate: '',
                start: '',
                end: '',
                cost: '',
            },
            dataPlaceAreas: []
        };
    },

    created() {
        this.getPlaceEndArea();
    },
    computed: mapGetters(['getInfoUser', 'getToken']),
    methods: {
        back() {
            let id = this.$route.params.id;
            this.$router.push({ name: 'CampaignDetail', params: { id: id } })
        },
        saveSession() {
            let scop = this;
            scop.validateError.name = '';
            let id = scop.$route.params.id;
            axios.post('http://127.0.0.1:8000/api/session/create', scop.dataForm, {
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
                        scop.validateError.place_id = typeof error.response.data.data.place_id !== 'undefined' ? error.response.data.data.place_id[0] : '';
                        scop.validateError.type = typeof error.response.data.data.type !== 'undefined' ? error.response.data.data.type[0] : '';
                        scop.validateError.title = typeof error.response.data.data.title !== 'undefined' ? error.response.data.data.title[0] : '';
                        scop.validateError.description = typeof error.response.data.data.description !== 'undefined' ? error.response.data.data.description[0] : '';
                        scop.validateError.vaccinate = typeof error.response.data.data.vaccinate !== 'undefined' ? error.response.data.data.vaccinate[0] : '';
                        scop.validateError.start = typeof error.response.data.data.start !== 'undefined' ? error.response.data.data.start[0] : '';
                        scop.validateError.end = typeof error.response.data.data.end !== 'undefined' ? error.response.data.data.end[0] : '';
                        scop.validateError.cost = typeof error.response.data.data.cost !== 'undefined' ? error.response.data.data.cost[0] : '';
                    }
                });
        },
        getPlaceEndArea() {
            let scop = this;
            let id = scop.$route.params.id;
            let token = localStorage.getItem('token_login_hht');
            axios.get('http://127.0.0.1:8000/api/get/place/area/' + id, {
                headers: { "Authorization": token }
            })
                .then(function (response) {
                    scop.dataPlaceAreas = response.data.data;
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