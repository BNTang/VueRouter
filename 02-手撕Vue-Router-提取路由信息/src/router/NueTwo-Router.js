import router from "@/router/index";

class NueRouterInfo {
    constructor() {
        this.currentPath = null;
    }
}

class NueRouter {
    constructor(options) {
        this.mode = options.mode || 'hash';
        this.routes = options.routes || [];

        this.routesMap = this.createRoutesMap();
        this.routerInfo = new NueRouterInfo();

        this.initDefault();
    }

    initDefault() {
        if (this.mode === 'hash') {
            // 1.判断打开的界面有没有hash, 如果没有就跳转到#/
            if (!location.hash) {
                location.hash = '/';
            }
            // 2.加载完成之后和hash发生变化之后都需要保存当前的地址
            window.addEventListener('load', () => {
                console.log('load');
                this.routerInfo.currentPath = location.hash.slice(1);
            });
            window.addEventListener('hashchange', () => {
                this.routerInfo.currentPath = location.hash.slice(1);
                console.log(this.routerInfo);
            });
        } else {
            // 1.判断打开的界面有没有路径, 如果没有就跳转到/
            if (!location.pathname) {
                location.pathname = '/';
            }
            // 2.加载完成之后和history发生变化之后都需要保存当前的地址
            window.addEventListener('load', () => {
                console.log('load');
                this.routerInfo.currentPath = location.pathname;
            });
            window.addEventListener('popstate', () => {
                this.routerInfo.currentPath = location.pathname;
                // console.log(this.routerInfo);
            });
        }
    }

    createRoutesMap() {
        return this.routes.reduce((map, route) => {
            map[route.path] = route.component;
            return map;
        }, {});
    }
}

NueRouter.install = (Vue, options) => {
    Vue.mixin({
        beforeCreate() {
            if (this.$options && this.$options.router) {
                this.$router = this.$options.router;
                this.$route = this.$router.routerInfo;
                Vue.util.defineReactive(this, 'xxx', this.$router);
            } else {
                this.$router = this.$parent.$router;
                this.$route = this.$router.routerInfo;
            }
        }
    })
    Vue.component('router-link', {
        props: {
            to: {
                type: String,
            }
        },
        render() {
            let path = this.to;
            if (this._self.$router.mode === 'hash') {
                path = '#' + path;
            }
            return <a href={path}>{this.$slots.default}</a>
        }
    });

    Vue.component('router-view', {
        render(h) {
            console.log('render');
            const routesMap = this._self.$router.routesMap;
            const currentPath = this._self.$route.currentPath;
            console.log(currentPath);
            const currentComponent = routesMap[currentPath];
            return h(currentComponent);
        }
    });
}
export default NueRouter;
