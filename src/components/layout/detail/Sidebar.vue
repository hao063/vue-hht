<template>
    <nav class="col-md-2 d-none d-md-block bg-light sidebar">
        <div class="sidebar-sticky">
            <ul class="nav flex-column">
                <li class="nav-item"><a class="nav-link">Manage Campaigns</a>
                </li>
            </ul>

            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>{{getInfoUser.name}}</span>
            </h6>
            <ul class="nav flex-column">
                <li class="nav-item"><a class="nav-link active">Overview</a>
                </li>
            </ul>

            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>Reports</span>
            </h6>
            <ul class="nav flex-column mb-2">
                <li class="nav-item"><a @click="next" class="nav-link poin">Palce capacity</a></li>
            </ul>
        </div>
    </nav>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
    name: 'Sidebar',

    data() {
        return {

        };
    },
    computed: mapGetters(['getInfoUser', 'getToken']),
    mounted() {

    },

    methods: {
        next() {
            let id = this.$route.params.id;
            this.$router.push({ name: 'ReportIndex' , params: {id: id}});
        }
    },
};
</script>

<style scoped>

</style>