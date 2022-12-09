<template>
    <div>
        <header-campaign></header-campaign>

        <div class="container-fluid">
            <div class="row">

                <sidebar></sidebar>

                <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
                    <div
                        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 class="h2">Manage Campaigns</h1>
                    </div>

                    <div class="mb-3 pt-3 pb-2">
                        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
                            <h2 class="h4">Create new ticket</h2>
                        </div>
                    </div>

                    <form class="needs-validation" novalidate action="campaigns/detail.html">

                        <div class="row">
                            <div class="col-12 col-lg-4 mb-3">
                                <label for="inputName">Name</label>
                                <!-- adding the class is-invalid to the input, shows the invalid feedback below -->
                                <input type="text" v-model="dataForm.name" class="form-control"
                                    :class="{ 'is-invalid': validateError.name != '' }" id="inputName" name="name"
                                    placeholder="" value="">
                                <div class="invalid-feedback">
                                    {{ validateError.name }}
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12 col-lg-4 mb-3">
                                <label for="inputCost">Cost</label>
                                <input type="number" v-model="dataForm.cost" class="form-control" id="inputCost"
                                    :class="{ 'is-invalid': validateError.cost != '' }" name="cost" placeholder=""
                                    value="0">
                                <div class="invalid-feedback">
                                    {{ validateError.cost }}
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12 col-lg-4 mb-3">
                                <label for="selectSpecialValidity">Special Validity</label>
                                <select @change="changeSpecial" class="form-control" id="selectSpecialValidity"
                                    name="special_validity">
                                    <option value="2" selected>None</option>
                                    <option value="0">Limited amount</option>
                                    <option value="1">Purchaseable till date</option>
                                </select>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12 col-lg-4 mb-3">
                                <label for="inputAmount">Maximum amount of tickets to be sold</label>
                                <input type="number" v-model="dataForm.amount" class="form-control"
                                    :disabled="isCheck.amount"
                                    :class="{ 'is-invalid': validateError.special_validity != '' && validateError.type == 0 }"
                                    id="inputAmount" name="amount" placeholder="" value="0">
                                <div class="invalid-feedback">
                                    {{ validateError.name }}
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12 col-lg-4 mb-3">
                                <label for="inputValidTill">Tickets can be sold until</label>
                                <input type="text" v-model="dataForm.date" class="form-control"
                                    :class="{ 'is-invalid': validateError.special_validity != '' && validateError.type == 1 }"
                                    :disabled="isCheck.date" id="inputValidTill" name="valid_until"
                                    placeholder="yyyy-mm-dd HH:MM" value="">
                                <div class="invalid-feedback">
                                    {{ validateError.special_validity }}
                                </div>
                            </div>
                        </div>

                        <hr class="mb-4">
                        <button type="button" @click="saveTicket" class="btn btn-primary">Save ticket</button>
                        <a class="btn btn-link poin" @click="back">Cancel</a>
                    </form>

                </main>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderCampaign from '@/components/layout/HeaderCampaign';
import Sidebar from '@/components/layout/detail/Sidebar';
import axios from 'axios';
import { mapGetters, mapMutations } from 'vuex'

export default {
    name: 'TicketCreate',

    data() {
        return {
            dataForm: {
                campaign_id: '',
                name: '',
                cost: '',
                type: 2,
                amount: '',
                date: ''
            },
            validateError: {
                name: '',
                cost: '',
                date: '',
                amount: '',
                type: '',
                special_validity: ''
            },
            isCheck: {
                date: true,
                amount: true,
            }
        };
    },

    mounted() {

    },
    computed: mapGetters(['getInfoUser', 'getToken']),
    methods: {
        changeSpecial(value) {
            this.dataForm.type = value.target.value;
            this.isCheck.date = true;
            this.isCheck.amount = true;
            this.dataForm.date = '';
            this.dataForm.amount = '';

            if (value.target.value == 0) {
                this.isCheck.amount = false;
            } else if (value.target.value == 1) {
                this.isCheck.date = false;
            }
        },
        backCampaign() {
            this.$router.push({ name: 'CampaignIndex' })
        },
        saveTicket() {
            let scop = this;
            scop.validateError.name = '';
            scop.validateError.date = '';
            scop.validateError.type = '';
            scop.validateError.special_validity = '';
            let id = this.$route.params.id;
            let form = {
                campaign_id: id,
                name: scop.dataForm.name,
                cost: scop.dataForm.cost,
                type: scop.dataForm.type,
            };

            if (scop.dataForm.type == 0) {
                form.special_validity = scop.dataForm.amount;
            } else if (scop.dataForm.type == 1) {
                form.special_validity = scop.dataForm.date;
            } else {
                form.special_validity = '';
            }
            axios.post('http://127.0.0.1:8000/api/ticket/create', form, {
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
                        scop.validateError.slug = typeof error.response.data.data.slug !== 'undefined' ? error.response.data.data.slug[0] : '';
                        scop.validateError.date = typeof error.response.data.data.date !== 'undefined' ? error.response.data.data.date[0] : '';
                        scop.validateError.type = typeof error.response.data.data.type !== 'undefined' ? error.response.data.data.type[0] : '';
                        scop.validateError.special_validity = typeof error.response.data.data.special_validity !== 'undefined' ? error.response.data.data.special_validity[0] : '';
                    }
                });
        },
        back() {
            let id = this.$route.params.id;
            this.$router.push({ name: 'CampaignDetail', params: { id: id } })
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