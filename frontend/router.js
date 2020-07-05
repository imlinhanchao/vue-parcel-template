const Index = () => import('./views/index')

const routers = [{
    path: '/',
    meta: {
        title: 'Home'
    },
    component: Index,
    props: {
        loginPage: false
    },
}, {
    path: '*',
    redirect: '/'
}];
export default routers;