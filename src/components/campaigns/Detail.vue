<template>
    <div>
        <header-detail></header-detail>
        <div class="container-fluid">
            <div class="row">
                <sidebar></sidebar>
                <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
                    <!-- Campaign -->
                    <edit-campaign></edit-campaign>

                    <!-- Tickets -->
                    <div id="tickets" class="mb-3 pt-3 pb-2">
                        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
                            <h2 class="h4">Tickets</h2>
                            <div class="btn-toolbar mb-2 mb-md-0">
                                <div class="btn-group mr-2">
                                    <a @click="newTicket" class="btn btn-sm btn-outline-secondary poin">
                                        Create new ticket
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row tickets">
                        <div v-for="itemTicket in dataTickets" class="col-md-4">
                            <div class="card mb-4 shadow-sm">
                                <div class="card-body">
                                    <h5 class="card-title">{{ itemTicket.name }}</h5>
                                    <p class="card-text">{{ itemTicket.cost }}</p>
                                    <p class="card-text">{{ itemTicket.special_validity != null ?
                                            itemTicket.special_validity : "&nbsp;"
                                    }} </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Sessions -->
                    <div id="sessions" class="mb-3 pt-3 pb-2">
                        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
                            <h2 class="h4">Sessions</h2>
                            <div class="btn-toolbar mb-2 mb-md-0">
                                <div class="btn-group mr-2">
                                    <a @click="newSession" class="btn btn-sm btn-outline-secondary poin">
                                        Create new session
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="table-responsive sessions">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Time</th>
                                    <th>Type</th>
                                    <th class="w-100">Title</th>
                                    <th>Participant</th>
                                    <th>Area</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="itemSession in dataSessions" :index="itemSession.id">
                                    <td class="text-nowrap">{{itemSession.start}} - {{itemSession.end}}</td>
                                    <td>{{itemSession.type}}</td>
                                    <td><a @click="editSession(itemSession.id)" class="poin" style="color:blue">{{itemSession.title}}</a></td>
                                    <td class="text-nowrap">{{itemSession.vaccinate}}</td>
                                    <td class="text-nowrap">{{itemSession.place.area.name}} / {{itemSession.place_name}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Areas -->
                    <div id="channels" class="mb-3 pt-3 pb-2">
                        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
                            <h2 class="h4">Areas</h2>
                            <div class="btn-toolbar mb-2 mb-md-0">
                                <div class="btn-group mr-2">
                                    <a class="btn btn-sm btn-outline-secondary poin" @click="createArea">
                                        Create new area
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row channels">
                        <div class="col-md-4" v-for="itemArea in dataAreas">
                            <div class="card mb-4 shadow-sm">
                                <div class="card-body">
                                    <h5 class="card-title">{{itemArea.name}}</h5>
                                    <p class="card-text">{{itemArea.session_total}} sessions, {{itemArea.place_total}} palce</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Palces -->
                    <div id="rooms" class="mb-3 pt-3 pb-2">
                        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
                            <h2 class="h4">Places</h2>
                            <div class="btn-toolbar mb-2 mb-md-0">
                                <div class="btn-group mr-2">
                                    <a @click="createPlace" class="btn btn-sm btn-outline-secondary">
                                        Create new place
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="table-responsive rooms">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Capacity</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="itemPlace in dataPlaces" :index="itemPlace.id">
                                    <td>{{itemPlace.name}}</td>
                                    <td>{{itemPlace.capacity}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </main>
            </div>
        </div>

    </div>
</template>

<script>

import axios from 'axios';
import EditCampaign from '@/components/layout/detail/EditCampaign';
import HeaderDetail from '@/components/layout/HeaderCampaign';
import Sidebar from '@/components/layout/detail/Sidebar';
import { mapGetters, mapMutations } from 'vuex'


export default {
    name: 'CampaignDetail',
    components: {
        EditCampaign,
        HeaderDetail,
        Sidebar
    },
    data() {
        return {
            dataTickets: [],
            dataAreas: [],
            dataPlaces: [],
            dataSessions: [],
        };
    },

    created() {
        this.getDetailCampaign()
    },
    computed: mapGetters(['getDataDetail']),
    methods: {
        ...mapMutations(['PUSH_DATA_DETAIL']),
        getDetailCampaign() {
            let scop = this;
            let id = this.$route.params.id;
            let token = localStorage.getItem('token_login_hht');
            axios
                .get('http://127.0.0.1:8000/api/campaign/detail/' + id, {
                    headers: { "Authorization": token }
                })
                .then(function (response) {
                    if (response.status == 200) {
                        scop.dataTickets = response.data.data.tickets;
                        scop.dataAreas = response.data.data.areas;
                        scop.dataPlaces = response.data.data.places;
                        scop.dataSessions = response.data.data.sessions;
                        scop.PUSH_DATA_DETAIL(response.data.data);
                    }
                }).catch(function (error) {
                });
        }, 
        newTicket() {
            let id = this.$route.params.id;
            this.$router.push({ name: 'TicketCreate' , params: {id: id}})
        }, 
        createArea() {
            let id = this.$route.params.id;
            this.$router.push({ name: 'AreaCreate' , params: {id: id}})
        },
        createPlace() {
            let id = this.$route.params.id;
            this.$router.push({ name: 'PlaceCreate' , params: {id: id}})
        }, 
        newSession() {
            let id = this.$route.params.id;
            this.$router.push({ name: 'SessionCreate' , params: {id: id}})
        }, 
        editSession(sessionId) {
            let id = this.$route.params.id;
            this.$router.push({ name: 'SessionEdit' , params: {id: id, session_id: sessionId}})
        }
    },
};
</script>

<style scoped>

</style>