<template>
    <div class="border-bottom mb-3 pt-3 pb-2 event-title">
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
            <h1 class="h2">{{getDataDetail.name}}</h1>
            <div class="btn-toolbar mb-2 mb-md-0">
                <div class="btn-group mr-2">
                    <a  class="btn btn-sm btn-outline-secondary poin" @click="campaignEdit(getDataDetail.id)">Edit
                        campaign</a>
                </div>
            </div>
        </div>
        <span class="h6">{{getDataDetail.date}}</span>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
    name: 'EditCampaign',

    data() {
        return {

        };
    },
    computed: mapGetters(['getDataDetail']),
    mounted() {

    },

    methods: {
        campaignEdit(id) {
            this.$router.push({ name: 'CampaignEdit' , params: {id: id}})
        }
    },
};
</script>

<style scoped>

</style>