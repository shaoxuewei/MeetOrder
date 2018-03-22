import router from './router/index'


router.beforeEach((to, from, next) => {
    if(window.location.href.indexOf('?#')==-1){
        location.href='http://test.heiniaozhi.cn/WeiXin/?#'+to.path
    }
    next()
})