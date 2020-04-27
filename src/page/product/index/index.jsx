import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from 'component/page-title/index.jsx';
import Pagination from 'util/pagination/index.jsx';

import Mutil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';
import TableList from '../../../util/table-list/index.jsx';
import ListSearch from './index-list-search.jsx';

import './index.scss';

const _mm = new Mutil();
const _product = new Product();


class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            pageNum: 1,
            listType: 'list',
            searchType: '',
            searchKeyword: ''
        }
    }
    componentDidMount() {
        this.loadProductList();
    }
    //加载商品列表
    loadProductList() {
        let listPram = {};
        listPram.listType = this.state.listType;
        listPram.pageNum = this.state.pageNum;
        //加载类型为搜索时传入搜索类型和关键字
        if (this.state.listType === 'search') {
            listPram.searchType = this.state.searchType;
            listPram.searchKeyword = this.state.searchKeyword;
        }
        _product.getProductList(listPram)
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
            this.loadProductList();
        })
    }
    //商品上下架
    //status : 1-在售 2-下架
    onSetProductStatus(e, productId, currentStatus) {
        let newStatus = currentStatus === 1 ? 2 : 1;

        if (window.confirm(`确认要将该产品${currentStatus === 1 ? '下架' : '上架'} 吗？`)) {
            _product.onSetProductStatus(productId, newStatus)
                .then((res) => {
                    _mm.successMsgTips(res);
                    //刷新
                    this.loadProductList();
                }, (err => {
                    _mm.errMsgTips(err);
                }));
        }
    }
    onSearchProduct(searchType, searchKeyword) {
        let listType = searchKeyword === '' ? 'list' : 'search';
        //KNOW setState是异步操作，注意执行 loadProductList 方法的时机
        this.setState({
            listType: listType,
            pageNum: 1,
            searchType: searchType,
            searchKeyword: searchKeyword
        }, () => {
            this.loadProductList();
        });
    }
    render() {
        let listProduct =
            this.state.list.map((product, index) => {
                return (
                    <tr key={index}>
                        <th>{product.id}</th>
                        <th>
                            <p>{product.name}</p>
                            <p>{product.subtitle}</p>
                        </th>
                        <th>{product.price}</th>
                        <th>
                            <p>{product.status === 1 ? '在售' : '已下架'}</p>
                            <button className="btn btn-xs btn-warning"
                                onClick={(e) => this.onSetProductStatus(e, product.id, product.status)}>
                                {product.status === 1 ? '下架' : '上架'}
                            </button>
                        </th>
                        <th>
                            <Link className="operation" to={`/product/detail/${product.id}`}>详情</Link>
                            <Link className="operation" to={`/product/save/${product.id}`}>编辑</Link>
                        </th>
                    </tr>
                );
            });
        let tableHeads = [
            {
                name: '商品ID',
                width: '10%'
            },
            {
                name: '信息',
                width: '50%'
            },
            {
                name: '价格',
                width: '10%'
            },
            {
                name: '状态',
                width: '15%'
            },
            {
                name: '操作',
                width: '15%'
            }
        ]
        return (
            <div className="container" id="page-wrapper">
                <PageTitle className="page-header" title="商品列表" >
                    <div className="page-header--right">
                        <Link to="/product/save" className="btn btn-primary page-header--right">
                            <i className="fa fa-plus"></i>
                            <span>添加商品</span>
                        </Link>
                    </div>
                </PageTitle>
                <ListSearch
                    onSearch={(searchType, searchKeyword) => this.onSearchProduct(searchType, searchKeyword)} />
                <div className="row">
                    <div className="table-wrap col-md-12">
                        <TableList tableHeads={tableHeads}>
                            {listProduct}
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

export default ProductList