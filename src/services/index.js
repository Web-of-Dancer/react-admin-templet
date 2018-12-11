/**
 * 所有卡券信息相关接口
 */
import request from '../utils/request';
import cookie from "../utils/cookie"
export default {
  getHost(){
    return request('/score/getHost');
  },
    // 获取房间列表
  getRooms(data) {
    return request('/score/getRoomInfo',
      {
        method: 'POST',
        body: JSON.stringify(data)
      });
  },
  // 获取房间积分配置
  getRoomScore(data) {
    return request('/score/getRoomScore',
      {
        method: 'POST',
        body: JSON.stringify(data)
      });
  },
  // 添加房间积分配置
  addRoomScore(data) {
    return request('/score/addRoomScore',
      {
        method: 'POST',
        body: JSON.stringify(data)
      });
  },
  // 新增牌型配置
  brandConfig(data) {
    return request('/score/brand',
      {
        method: 'POST',
        body: JSON.stringify(data)
      });
  },
}
