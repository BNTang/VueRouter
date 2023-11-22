class NueRouter {
    constructor(options) {
        this.mode = options.mode || 'hash';
        this.routes = options.routes || [];
        // 提取路由信息
        this.routesMap = this.createRoutesMap();
        console.log(this.routesMap);
    }

    createRoutesMap() {
        return this.routes.reduce((map, route) => {
            map[route.path] = route.component;
            return map;
        }, {})
    }
}

NueRouter.install = (Vue, options) => {
    Vue.mixin({
        beforeCreate() {
            if (this.$options && this.$options.router) {
                this.$router = this.$options.router;
                this.$route = this.$router.routeInfo;
            } else {
                this.$router = this.$parent.$router;
                this.$route = this.$router.routeInfo;
            }
        }
    })
}
export default NueRouter;
