import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import TableList from 'util/table-list/index.jsx';

import Mutil from 'util/mm.jsx';
import Order from 'service/order-service.jsx';

import './detail.scss';

const _mm = new Mutil();
const _order = new Order();


class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderNumber: this.props.match.params.orderNO,
            orderInfo: {}
        }
    }
    componentDidMount() {
        this.loadOrder();
    }

    //加载订单信息
    loadOrder() {
        _order.getOrderDetail(this.state.orderNumber).then((res) => {
            console.log(res);
            this.setState({
                orderInfo: res
            });
        }, (errMsg) => {
            _mm.errorTips(errMsg);
        });
    }
    //处理上传图片参数
    getSubImageString() {
        let subImageString = '';
        //拼接字符串
        this.state.subImages.map(
            (subImage, index) => {
                subImageString = subImageString.concat(subImage.uri, ',');
            }
        );
        //去除最后一个逗号
        subImageString = subImageString.substring(0, subImageString.length - 1)
        return subImageString;
    }
    render() {
        let receiverInfo = this.state.orderInfo.shippingVo;
        let listProduct = this.state.orderInfo.orderItemVoList ?  //第一次渲染时还未获取订单信息，所以需要判断 orderInfo 是否为真 
            this.state.orderInfo.orderItemVoList.map((orderItem, index) => {
                return (
                    <tr key={index}>
                        <th>
                            <img className="orderDetail-img--table" src={this.state.orderInfo.imageHost + orderItem.productImage} />
                        </th>
                        <th>{orderItem.productName}</th>
                        <th>￥{orderItem.currentUnitPrice}</th>
                        <th>{orderItem.quantity}</th>
                        <th>￥{orderItem.totalPrice}</th>
                    </tr>
                );
            }) : null;
        let tableHeads = [
            {
                name: '商品图片',
                width: '15%'
            },
            {
                name: '商品信息',
                width: '40%'
            },
            {
                name: '单价',
                width: '15%'
            },
            {
                name: '数量',
                width: '15%'
            },
            {
                name: '	合计',
                width: '15%'
            }
        ]
        return (
            <div className="container" id="page-wrapper">
                <PageTitle className="page-header" title="订单详情" />
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">订单号</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.orderInfo.orderNo}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">创建时间</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.orderInfo.createTime}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">收件人</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                {/* 第一次渲染时还未获取订单信息，所以需要判断 receiverInfo 是否为真 */}
                                {receiverInfo ?
                                    <span>
                                        {/* 收件人，省市，区，地址 */}
                                        {receiverInfo.receiverName}，
                                        {receiverInfo.receiverProvince}
                                        {receiverInfo.receiverCity}
                                        {receiverInfo.receiverDistrict}，
                                        {receiverInfo.receiverAddress}，
                                        {receiverInfo.receiverPhone || receiverInfo.receiverMobile}
                                    </span>
                                    : ''}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">订单状态</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.orderInfo.statusDesc}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">支付方式</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.orderInfo.paymentTypeDesc}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">订单金额</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{`￥${this.state.orderInfo.payment}`}</p>
                        </div>
                    </div>
                </div>
                <div className="table-wrap col-md-12">
                    {//判断是否渲染
                        this.state.orderInfo.orderItemVoList ?
                            <TableList tableHeads={tableHeads}>
                                {listProduct}
                            </TableList>
                            : null
                    }
                </div>
            </div>
        );
    }
}

export default ProductDetail