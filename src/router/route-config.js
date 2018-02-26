
const Index = resolve => {
    require.ensure(['../pages/Index.vue'], () => {
        resolve(require('../pages/Index.vue'))
    }, 'home')
}

let routeArray = [{
        path: '/',
        name: 'Index',
        component: Index,
        meta:{
            
        }
    },
]

export default {
    routes: routeArray
}
