/**
 * 房间列表
 *  Created by wyg on 2018/06/30.
 */
import React from 'react';
import { connect } from 'dva';
import { Link, withRouter } from 'dva/router';
import { getRooms } from '../services/index';
import { Table, Tag, Select, Input, message, Row, Col, Popconfirm } from 'antd';
import moment from 'moment';



const Option = Select.Option;
const Search = Input.Search;
class ShopCoin extends React.Component {
  constructor() {
    super();
    this.state = {
      sales: null,
      queryInfo: {
        limit: 20,
        offset: 0
      }
    }
  }
  componentDidMount() {
    // 获取房间列表
    getRooms().then(data=>{
      console.log('------------------------房间列表: ',data)
      this.setState({rooms:data})
    })
  }
  columns = [
    {
      title: '时间',
      dataIndex: 'StartTime',
      render: createTime => moment(createTime * 1000).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '赛事名称',
      dataIndex: 'Title',
    },
    {
      title: '赛事ID',
      dataIndex: 'roomID',
      render: (id, record) => <Link to={`${this.props.match.path}/${record.roomID}`}><Tag color="blue">{id}</Tag></Link>
    },
    {
      title: '游戏',
      dataIndex: 'gameType',
    },
    {
      title: '城市',
      dataIndex: 'cityCode',
    },
    {
      title: "操作",
      render: (record) => <Link to={`${this.props.match.path}/${record.roomID}`}><Tag color="blue">配置</Tag></Link>
    }
  ]

  render() {
    const { rooms } = this.state;
    return (
      <div id="Voucher">
        <Table
          columns={this.columns}
          dataSource={rooms}
          bordered
          size="small"
          rowKey={record => record.roomID }
        />
      </div>
    );
  }
}

export default ShopCoin