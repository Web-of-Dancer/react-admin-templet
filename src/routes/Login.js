/**
 * 登录页
 *  Created by wyg on 2018/06/29.
 */
import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Spin, Icon } from 'antd';
import { routerRedux } from 'dva/router';
import './Login.less';

const antIcon = <Icon type="loading" style={{ fontSize: 24,color:"#fff" }} spin />;
const FormItem = Form.Item
class Login extends React.Component {
  constructor(){
    super()
    this.state = {
      loading: false
    }
  }
  componentDidMount() {

  }
  handleSubmit = (e) => {
    this.setState({
      loading: true
    })
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'login/login',
          payload: values,
        });
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="flex column jc-center ai-center h100p">
        <ul className="bg-bubbles">
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
        </ul>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('loginName', {
              initialValue: '',
              rules: [{ required: true, message: 'Please input your username!' }]
            })(
              <Input placeholder="username" />
              )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('loginPass', {
              initialValue: '',
              rules: [{ required: true, message: 'Please input your password!' }]
            })(
              <Input type="password" placeholder="password" />
              )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
            >
            <Spin spinning={this.state.loading} indicator={antIcon} delay={500} />
            登陆</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

function mapStateToProps({ login }) {
  return { login };
}

export default connect(mapStateToProps)(Form.create()(Login));
