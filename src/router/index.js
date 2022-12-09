import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import CampaignIndex from '@/components/campaigns/Index'
import CampaignCreate from '@/components/campaigns/Create'
import CampaignEdit from '@/components/campaigns/Edit'
import CampaignDetail from '@/components/campaigns/Detail'

// tickets
import TicketCreate from '@/components/tickets/Create'

// areas
import AreaCreate from '@/components/areas/Create'

// place
import PlaceCreate from '@/components/places/Create'

// session
import SessionCreate from '@/components/sessions/Create'
import SessionEdit from '@/components/sessions/Edit'

// report
import ReportIndex from '@/components/report/Index'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    }, 
    {
      path: '/campaign/index',
      name: 'CampaignIndex',
      component: CampaignIndex
    }, 
    {
      path: '/campaign/create',
      name: 'CampaignCreate',
      component: CampaignCreate
    }, 
    {
      path: '/campaign/edit/:id',
      name: 'CampaignEdit',
      component: CampaignEdit
    }, 
    {
      path: '/campaign/detail/:id',
      name: 'CampaignDetail',
      component: CampaignDetail
    }
    , 
    {
      path: '/campaign/:id/tickets/create',
      name: 'TicketCreate',
      component: TicketCreate
    }
    , 
    {
      path: '/campaign/:id/areas/create',
      name: 'AreaCreate',
      component: AreaCreate
    }
    , 
    {
      path: '/campaign/:id/area/place/create',
      name: 'PlaceCreate',
      component: PlaceCreate
    }
    , 
    {
      path: '/campaign/:id/area/place/session/create',
      name: 'SessionCreate',
      component: SessionCreate
    }
    , 
    {
      path: '/campaign/:id/area/place/session/edit/:session_id',
      name: 'SessionEdit',
      component: SessionEdit
    },
    {
      path: '/campaign/:id/report',
      name: 'ReportIndex',
      component: ReportIndex
    } 
  ]
})
