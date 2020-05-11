import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from 'component/page-title/index.jsx';

import Mutil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';
import TableList from '../../../util/table-list/index.jsx';

// import './index.scss';

const _mm = new Mutil();
const _product = new Product();


class CategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            parentCategoryId: 0,
            list: []
        }
    }
    componentDidMount() {
        this.loadCategoryList();
    }
    componentDidUpdate(preProps, preState) {
        //对比新旧参数变化
        if (preProps.match.params.cid !== this.props.match.params.cid) {
            this.setState({
                parentCategoryId: this.props.match.params.cid
            }, () => {
                //重新渲染列表
                this.loadCategoryList();
            });
        }
    }
    //加载品类列表
    loadCategoryList() {
        _product.getCategoryList(this.state.parentCategoryId)
            .then(res => {
                this.setState({
                    list: res
                });
            }, (errMsg => {
                _mm.errorTips(errMsg)
            }));
    }
    //修改名称
    onRename(categoryId, categoryName) {
        let newCategoryName = window.prompt('请输入该品类新名称：', categoryName);
        _product.setCategoryName(categoryId, newCategoryName)
            .then((res) => {
                _mm.successMsgTips(res);
                this.loadCategoryList();
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            });
    }
    render() {
        let listProduct =
            this.state.list.map((category, index) => {
                return (
                    <tr key={index}>
                        <th>{category.id}</th>
                        <th>{category.name}</th>
                        <th>
                            <a className="operation"
                                onClick={() => this.onRename(category.id, category.name)}>修改名称</a>
                            {this.state.parentCategoryId ? null : <Link className="operation" to={`/product-category/index/${category.id}`}>查看其子品类</Link>}
                        </th>
                    </tr >
                );
            });
        let tableHeads = [
            {
                name: '品类ID',
                width: '15%'
            },
            {
                name: '品类名称',
                width: '50%'
            },
            {
                name: '操作',
                width: '35%'
            }
        ]
        return (
            <div className="container" id="page-wrapper">
                <PageTitle className="page-header" title="品类管理" >
                    <div className="page-header--right">
                        <Link to="/product-category/add" className="btn btn-primary page-header--right">
                            <i className="fa fa-plus"></i>
                            <span>添加品类</span>
                        </Link>
                    </div>
                </PageTitle>
                <div className="row">
                    <div className="table-wrap col-md-12">
                        <TableList tableHeads={tableHeads}>
                            {listProduct}
                        </TableList>
                    </div>
                </div>
            </div>
        );
    }
}

export default CategoryList