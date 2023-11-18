import router from "./index";

class NueRouteInfo {
    constructor(){
        this.currentPath = null;
    }
}
class NueRouter {
    constructor(options){
        this.mode = options.mode || 'hash';
        this.routes = options.routes || [];
        // 提取路由信息
        this.routesMap = this.createRoutesMap();
        this.routeInfo = new NueRouteInfo();
        // 初始化默认的路由信息
        this.initDefault();
    }
    initDefault(){
        if(this.mode === 'hash'){
            // 1.判断打开的界面有没有hash, 如果没有就跳转到#/
            if(!location.hash){
                location.hash = '/';
            }
            // 2.加载完成之后和hash发生变化之后都需要保存当前的地址
            window.addEventListener('load', ()=>{
                this.routeInfo.currentPath = location.hash.slice(1);
            });
            window.addEventListener('hashchange', ()=>{
                this.routeInfo.currentPath = location.hash.slice(1);
                console.log(this.routeInfo);
            });
        }else{
            // 1.判断打开的界面有没有路径, 如果没有就跳转到/
            if(!location.pathname){
                location.pathname = '/';
            }
            // 2.加载完成之后和history发生变化之后都需要保存当前的地址
            window.addEventListener('load', ()=>{
                console.log('load');
                this.routeInfo.currentPath = location.pathname;
            });
            window.addEventListener('popstate', ()=>{
                this.routeInfo.currentPath = location.pathname;
                console.log(this.routeInfo);
            });
        }
    }
    createRoutesMap(){
        return  this.routes.reduce((map, route)=>{
            map[route.path] = route.component;
            return map;
        }, {})
    }
}
NueRouter.install = (Vue, options)=>{
    Vue.mixin({
        beforeCreate(){
            if(this.$options && this.$options.router){
                this.$router = this.$options.router;
                this.$route = this.$router.routeInfo;
                Vue.util.defineReactive(this, 'xxx', this.$router);
            }else{
                this.$router = this.$parent.$router;
                this.$route = this.$router.routeInfo;
            }
        }
    });
    /*
    只要外界使用了Vue-Router, 那么我们就必须提供两个自定义的组件给外界使用
    只要外界通过Vue.use注册了Vue-Router, 就代表外界使用了Vue-Router
    只要接通通过Vue.use注册了Vue-Router, 就会调用插件的install方法
    所以我们只需要在install方法中注册两个全局组件给外界使用即可
    * */
    Vue.component('router-link', {
        props: {
            to: String
        },
        render(){
            /*
            注意点: render方法中的this并不是当前实例对象, 而是一个代理对象
                    如果我们想拿到当前实例对象, 那么可以通过this._self获取
            * */
            // console.log(this._self.$router.mode);
            let path = this.to;
            if(this._self.$router.mode === 'hash'){
                path = '#' + path;
            }
            return <a href={path}>{this.$slots.default}</a>
        }
    });
    Vue.component('router-view', {
        render(h){
            // console.log('render');
            let routesMap = this._self.$router.routesMap;
            let currentPath = this._self.$route.currentPath;
            // console.log(currentPath);
            let currentComponent = routesMap[currentPath];
            return h(currentComponent);
        }
    });
}
export default NueRouter;