<template>
    <div>
        <header-detail></header-detail>
        <div class="container-fluid">
            <div class="row">
                <sidebar></sidebar>
                <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
                    <canvas id="canvas" width="900" height="450"></canvas>
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
import test  from './assets/dist/Chart.min.js';

export default {
    name: 'WebappHhtIndex',
    components: {
        EditCampaign,
        HeaderDetail,
        Sidebar
    },
    data() {
        return {

        };
    },

    mounted() {
        var canvas = document.getElementById('canvas').getContext('2d');
        var myChart = new Chart(canvas, {
            type: 'bar',
            data: {
                labels: ['ad', 'ad', 'da', 'da', 'da'],
                datasets: [
                    {
                        'data': [
                            10, 20, 30, 12, 30, 22
                        ],
                        'backgroundColor': [
                            'blue', 'blue', 'green', 'blue', 'blue', 'blue'
                        ]
                    },
                    {
                        'data': [
                            20, 10, 25, 21, 1
                        ],
                        'backgroundColor': [
                            'blue', 'blue', 'red', 'blue', 'blue', 'blue'
                        ]
                    },
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    },

    methods: {

    },
};
</script>

<style scoped>

</style>