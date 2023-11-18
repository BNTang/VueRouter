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
        /*
        {
            '/home': Home,
            '/about': About
        }
        * */
        this.routesMap = this.createRoutesMap();
        // console.log(this.routesMap);
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

}
export default NueRouter;