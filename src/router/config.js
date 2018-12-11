// 仅用于生成菜单及相关路由, 不含Content内部嵌套
import { NotFound, DashBoard, RoomScoreConfig,BrandConfig } from "../routes";
import Detail from '../components/Detail'

export default [
  {
    path: '/dashboard', // 路由path, Redirect的from, 菜单key
    title: '欢迎页', // 菜单文本, 不填则不会生成菜单
    icon: 'global', // 菜单图标
    component: DashBoard, // 路由component
    strict: true, // 其他可以被无损转发到Route, Menu.Item的prop
  },
  {
    path: '/room',
    title: '赛事列表',
    icon: 'shop',
    component: RoomScoreConfig,
    exact: true,
  },
  {
    path: '/room/:id',
    component: Detail,
    exact: true,
  },
  {
    path: '/brand',
    title: '牌型配置',
    icon: 'global',
    component: BrandConfig,
    exact: true,
  },
  {
    path: '/', // Redirect的from
    exact: true,
    redirect: '/dashboard', // Redirect
  },
  {
    component: NotFound,
  }
]
