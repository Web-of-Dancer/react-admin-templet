import React from 'react';
import { brandConfig } from '../services/index';

import {
    Form, Select, InputNumber, Switch, Radio,
    Slider, Button, Upload, Icon, Rate, Input,
} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

function uploadImage(file, data, callback) {
    const formData = new FormData();
    formData.append("authorization", authorization);
    formData.append("policy", policy);
    formData.append("file", file.originFileObj);
}

const games = [
    { gameType: "matchMaJiang_wz", name: "麻将锦标赛" }, 
    { gameType: "freeRaceMaJiang_wz", name: "麻将自由赛" },
    { gameType: "match_ddz", name: "斗地主锦标赛" },
    { gameType: "freeRace_ddz", name: "斗地主自由赛" },
]

class BrandConfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadUrl: '/config/upload'
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { roomID, gameType } = values;
                console.log('-----------------formData', values);
                brandConfig({ roomID, gameType }).then(data => {
                    console.log('-----------------上传结果', data);
                })
            }
        });
    }

    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }
    // 选择游戏
    handleGame = (type) => {
        console.log('-----------------', type);
        if (type === 'freeRaceMaJiang_wz') {
            this.setState({ uploadUrl: "/config/uploadFree" })
        } else {
            this.setState({ uploadUrl: "/config/upload" })
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 4 },
        };
        const { uploadUrl } = this.state;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="请先选择房间ID"
                >
                    <span className="ant-form-text">最后选也可以</span>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="游戏类型"
                    hasFeedback
                >
                    {getFieldDecorator('gameType', {
                        rules: [
                            { required: true, message: '请选择游戏!' },
                        ],
                        initialValue: "matchMaJiang_wz"
                    })(
                        <Select placeholder="请选择游戏" onChange={this.handleGame}>
                            {
                                games.map((item, i) => {
                                    return (
                                        <Option key={i} value={item.gameType}>{item.name}</Option>
                                    )
                                })
                            }
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="房间ID"
                    hasFeedback
                >
                    {getFieldDecorator('roomID', {
                        rules: [
                            { required: true, message: '请输入房间ID!' },
                        ],
                    })(
                        <Input placeholder="请输入房间ID" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="上传配置"
                >
                    {getFieldDecorator('upload', {
                        rules: [
                            { required: true, message: '请选择文件!' },
                        ],
                        valuePropName: 'fileList',
                        getValueFromEvent: this.normFile,
                    })(
                        <Upload name="Excel" action={uploadUrl} listType="picture">
                            <Button>
                                <Icon type="upload" /> 请选择牌型配置Excel文件
                            </Button>
                        </Upload>
                    )}
                </FormItem>
                <FormItem
                    wrapperCol={{ span: 12, offset: 6 }}
                >
                    <Button type="primary" htmlType="submit">Submit</Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedBrandConfig = Form.create()(BrandConfig);

export default WrappedBrandConfig