import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import ProtectedButton from '../router/ProtectedButton'

function DashBoard({ login }) {
  const handleClick = () => { }

  return (
    <div>
      <p>欢迎页</p>
      <p>管理员: {JSON.stringify(login.roles)}</p>
      <h1>Welcome To Here</h1>
    </div>
  );
}

function mapStateToProps({ login }) {
  return { login };
}

export default connect(mapStateToProps)(DashBoard);
