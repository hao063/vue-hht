import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const storeData = {
        state: {
                statusAuth: false,
                token: '',
                host: '',
                loading: false,
                user: [],
                dataDetail: {}
        },
        getters: {
                getStatusAuth: state => state.statusAuth,
                getToken: state => state.token,
                getLoading: state => state.loading,
                getInfoUser: state => state.user,
                getDataDetail: state => state.dataDetail,
        },
        actions: {

        },
        mutations: {
                PUSH_TOKEN(state, data) {
                        state.token = data;
                },
                CHANGE_STATUS_AUTH(state, data) {
                        state.statusAuth = data;
                },
                CHANGE_LOADING(state, data) {
                        state.loading = data;
                },
                PUSH_INFOR_USER(state, data) {
                        state.user = data;
                }, 
                PUSH_DATA_DETAIL(state, data) {
                        state.dataDetail = data;
                }
        }
}

const store = new Vuex.Store(storeData)



export default store
