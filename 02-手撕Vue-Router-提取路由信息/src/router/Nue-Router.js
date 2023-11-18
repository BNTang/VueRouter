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
        console.log(this.routesMap);
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