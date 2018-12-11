/**
 * 房间积分配置
 *  Created by wyg on 2018/06/29.
 */
import React from 'react';
import { connect } from 'dva';
import { Link, withRouter } from 'dva/router';
import { Row, Col, Select, Input, Button, Message } from 'antd';
import { getRoomScore, addRoomScore } from '../services/index';


const Option = Select.Option;
const children = [];
for (let i = 1; i < 10; i++) {
  children.push(<Option key={i} value={JSON.stringify(i * 100)}>{i * 100}</Option>);
}

class Detail extends React.Component {
  constructor(props) {
    super(props)
    const { match: { params: { id } } } = props;
    this.state = {
      id: id,
      rows: 1,
      loopScore: {
        "2": [[
          25,
          50,
          75,
          100,
          125,
          150,
          175,
          200
        ]]
      },
      scores: [
        //   {
        //   loop: 2,
        //   score: [
        //     300,
        //     600,
        //     900,
        //     1200
        //   ],
        // }
      ]
    }
  }
  componentWillMount() {
    const { id } = this.state;
    this.fetch(id);


  }

  fetch = (id = this.props.match.params.id) => {
    getRoomScore({ roomID: id })
      .then(data => {
        const { scores, loopScore } = data;
        this.setState({ scores, loopScore });
      })

  }
  handleChangeRow = (e) => {
    this.setState({ rows: e.target.value });
    console.log(e.target.value);
  }
  handleSaveRow = () => {
    const { rows, scores, loopScore } = this.state;
    const newScore = [];
    const loopScoreItem = loopScore["2"][0]
    for (let i = 0; i < rows; i++) {
      let loop = i + 1;
      let score = [
        300,
        600,
        900,
        1200
      ];
      let item = { loop, score };
      let loopArr = [[25, 50, 75, 100, 125, 150, 175, 200]];
      score.map((item, j) => {
        loopArr.push(loopScoreItem);
      })
      loopScore[i + 1] = loopArr;
      newScore.push(item);
    }
    this.setState({ scores: newScore, loopScore });

  }
  handleChangeScore = (index, vals) => {
    let score = [];
    vals.map(item => {
      score.push(Number(item));
    })
    let { scores } = this.state;
    scores[index].score = score.sort((v1,v2)=> v1-v2);
    this.setState({ scores });
  }
  handleChangeLoop = (index, e) => {
    const loop = e.target.value;
    if (loop) {
      let { scores, loopScore } = this.state;
      for(var i in scores){
        var item = scores[i];
        if(loop == item.loop){
          Message.error('填写的轮次已存在!');
          return;
        }
      }
      const loopscore = loopScore[scores[index].loop];//缓存该轮的积分档
      delete loopScore[scores[index].loop];//删除原来的轮次
      loopScore[loop] = loopscore;//新的轮次积分档
      scores[index].loop = Number(loop);
      this.setState({ scores });
    }

  }
  handleChangeLoopScore = (loop, index, vals) => {
    let { loopScore } = this.state;
    let score = [];
    vals.map(item => {
      score.push(Number(item));
    })
    loopScore[loop][index] = score;
    console.log("---------积分匹配", loopScore);
    this.setState({ loopScore });
  }
  handleSubmit = () => {
    const { scores, loopScore, id } = this.state;
    const body = { scores, loopScore, roomID: id }; 
    addRoomScore(body).then(data => {
      console.log('----------------addRoomScore', data);
    })
  }
  handleOpen=(index)=>{
    console.log('-----------------展开',index);
  }
  render() {
    const { scores, loopScore } = this.state;
    console.log('-------------------------loopScore', loopScore)
    return (
      <div>
        <Row>
          <Col span={4}>
            <Col span={6}>
            添加轮次: 
            </Col>
            <Col span={14}>
            <Input onChange={this.handleChangeRow} />
            </Col>
          </Col>
          <Col span={4}>
            <Button type="primary" onClick={this.handleSaveRow} >确认</Button>
          </Col>
          <Col span={4} offset={6}>
            <Button type="primary" onClick={this.handleSubmit} >提交</Button>
          </Col>
          {
            scores.map((item, i) => (
              <Col span={24} style={{margin:"3px 0"}} key={i}>
                <Col span={2}>
                  <Input defaultValue={item.loop} onChange={e => this.handleChangeLoop(i, e)} />
                </Col>
                <Col span={18}>
                  <Select
                    mode="tags"
                    allowClear={true}
                    placeholder="Please select"
                    defaultValue={item.score}
                    tokenSeparators={[',']}
                    onChange={val => this.handleChangeScore(i, val)}
                    style={{ width: '100%' }}
                  >
                    {/* {children} */}
                  </Select>
                </Col>
              </Col>
            ))
          }
        </Row>
        
        <Row>
          {
            scores.length !== 0 ?
            <Col span={12}>
            <h2 style={{ textAlign: "center" }}>匹配积分范围</h2>
            </Col>
            :
            null
          }
         
          {
            scores.map((item, i) => (
              <Col style={{margin:"10px",background:"#ff181814"}} span={24} key={i}>
                <Col span={2}>
                轮次{item.loop}
                </Col>
                <Col span={20}>
                  {
                    item.score.map((sItem, j) => (
                      <Col style={{padding:"2px 0"}} span={24} key={j}>
                        <Col span={2}>
                          {sItem}以内
                        </Col>
                        <Col span={20}>
                          <Select
                            mode="tags"
                            allowClear={true}
                            placeholder="Please select"
                            defaultValue={loopScore[item.loop][j]}
                            tokenSeparators={[',']}
                            onChange={val => this.handleChangeLoopScore(item.loop, j, val)}
                            style={{ width: '100%' }}
                          >
                            {/* {children} */}
                          </Select>
                        </Col>
                      </Col>

                    ))
                  }
                  <Col span={24}>
                    <Col span={2}>
                      {item.score[item.score.length - 1]}++
                        </Col>
                    <Col span={20}>
                      <Select
                        allowClear={true}
                        mode="tags"
                        placeholder="Please select"
                        defaultValue={loopScore[item.loop][item.score.length - 1]}
                        tokenSeparators={[',']}
                        onChange={val => this.handleChangeLoopScore(item.loop, item.score.length, val)}
                        style={{ width: '100%' }}
                      >
                        {/* {children} */}
                      </Select>
                    </Col>
                  </Col>
                </Col>
              </Col>
            ))
          }
 
        </Row>

      </div>
    );
  }
}

export default Detail;
