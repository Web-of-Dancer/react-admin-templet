import React from 'react';
import { Route, Link } from 'dva/router';
import { connect } from 'dva';
import { NotAllowed } from '../routes';
import { hasPermission } from './permission';
import { Breadcrumb, } from 'antd';
import Cookie from '../utils/cookie'
const routes = [{
  path: '/',
  breadcrumbName: '首页'
},{
  path: 'voucher',
  breadcrumbName: '卡券库'
}, {
  path: 'agent',
  breadcrumbName: '代理卡券'
}, {
  path: 'shopmoney',
  breadcrumbName: '人民币商城'
}, {
  path: 'shopcoin',
  breadcrumbName: '呱籽商城'
}, {
  path: 'order',
  breadcrumbName: '订单记录'
}];
function itemRender(route, params, routes, paths) {
  const last = routes.indexOf(route) === routes.length - 1;
  return last ? <span>{route.breadcrumbName}</span> : <Link to={paths.join('/')}>{route.breadcrumbName}</Link>;
}
const ProtectedRoute = ({ userRoles, routeRoles, ...rest }) => {
  Cookie.setItem("shopId",routeRoles)
  return (<div>
    {/* <p>您的权限: {userRoles} (admin拥有所有权限)</p> */}
    <p>管理员: {userRoles}</p>
    {/* <p>路由访问权限: {JSON.stringify(routeRoles)}</p> */}
    {/* <Breadcrumb itemRender={itemRender} routes={routes}/> */}
    {hasPermission(userRoles, routeRoles) ? <Route {...rest} /> : <NotAllowed />}
  </div>)
}

export default connect(({ login: { roles } }) => ({ userRoles: roles }))(ProtectedRoute);
