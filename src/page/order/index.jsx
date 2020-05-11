import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from 'component/page-title/index.jsx';
import Pagination from 'util/pagination/index.jsx';

import Mutil from 'util/mm.jsx';
import Order from 'service/order-service.jsx';
import TableList from 'util/table-list/index.jsx';
import ListSearch from 'util/list-search/index.jsx';

import './index.scss';

const _mm = new Mutil();
const _product = new Order();


class OrderList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            pageNum: 1,
            listType: 'list',
            searchKeyword: ''
        }
    }
    componentDidMount() {
        this.loadOrderList();
    }
    //加载商品列表
    loadOrderList() {
        let listPram = {};
        listPram.listType = this.state.listType;
        listPram.pageNum = this.state.pageNum;
        //加载类型为搜索时传入搜索类型和关键字
        if (this.state.listType === 'search') {
            listPram.orderNo = this.state.searchKeyword;
        }
        _product.getOrderList(listPram)
            .then(res => {
                this.setState(res);
            }, (errMsg => {
                _mm.errorTips(errMsg)
            }));
    }
    //页码改变跳转
    onPageNumChange(pageNum) {
        this.setState({
            pageNum: pageNum
        }, () => {
            this.loadOrderList();
        })
    }
    onSearchOrder(searchType, searchKeyword) {
        let listType = searchKeyword === '' ? 'list' : 'search';
        //KNOW setState是异步操作，注意执行 loadOrderList 方法的时机
        this.setState({
            listType: listType,
            pageNum: 1,
            searchKeyword: searchKeyword
        }, () => {
            this.loadOrderList();
        });
    }
    render() {
        //查询类型
        let searchTypes = [{
                value: 'orderNo',
                name: '按订单号查询'
             }];
        let listOrder =
            this.state.list.map((Order, index) => {
                return (
                    <tr key={index}>
                        <th>
                            <Link className="operation" to={`/Order/detail/${Order.orderNo}`}>{Order.orderNo}</Link>
                        </th>
                        <th>{Order.receiverName}</th>
                        <th>{Order.statusDesc}</th>
                        <th>{Order.payment}</th>
                        <th>{Order.createTime}</th>
                        <th>
                            <Link className="operation" to={`/Order/detail/${Order.orderNo}`}>查看</Link>
                        </th>
                    </tr>
                );
            });
        let tableHeads = [
            {
                name: '订单号',
                width: '20%'
            },
            {
                name: '收件人',
                width: '15%'
            },
            {
                name: '订单状态',
                width: '15%'
            },
            {
                name: '订单总价',
                width: '15%'
            },
            {
                name: '	创建时间',
                width: '15%'
            },
            {
                name: '	操作',
                width: '20%'
            }
        ]
        return (
            <div className="container" id="page-wrapper">
                <PageTitle className="page-header" title="订单列表" />
                <ListSearch
                    searchTypes={searchTypes}
                    onSearch={(searchType, searchKeyword) => this.onSearchOrder(searchType, searchKeyword)} />
                <div className="row">
                    <div className="table-wrap col-md-12">
                        <TableList tableHeads={tableHeads}>
                            {listOrder}
                        </TableList>
                        <Pagination
                            current={this.state.pageNum}
                            total={this.state.total}
                            // totalBoundaryShowSizeChanger={10}
                            onChange={(pageNum) => this.onPageNumChange(pageNum)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default OrderList