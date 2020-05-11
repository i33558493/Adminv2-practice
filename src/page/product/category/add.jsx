import React from 'react';
import PageTitle from 'component/page-title/index.jsx';

import Mutil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';

const _mm = new Mutil();
const _product = new Product();


class CategoryAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstCategoryList: [],
            parentId: 0,
            categoryName: ''
        }
    }
    componentDidMount() {
        this.loadFirstCategoryList();
    }

    //加载一级节点
    loadFirstCategoryList() {
        _product.getCategoryList('0').then((res) => {
            this.setState({
                firstCategoryList: res
            });
        }, (errMsg) => {
            _mm.errorTips(errMsg);
        });
    }   
    //保存通用商品信息状态
    onCategoryInfoChange(e) {
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({
            [name]: value
        });
    }
    //提交
    onSubmit() {
        let parentId = this.state.parentId,
            categoryName = this.state.categoryName;
        //保存品类
        if (categoryName) {
            _product.addCategory(parentId, categoryName).then(
                (res) => {
                    _mm.successMsgTips(res.data);
                    //跳转页面
                    this.props.history.push('/product-category/index');
                },
                (errMsg) => { _mm.errorTips(errMsg) }
            );
        }
    }
    render() {
        return (
            <div className="container" id="page-wrapper">
                <PageTitle className="page-header" title="商品管理--添加商品" />
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">所属分类</label>
                        <div className="col-md-3">
                            <select className="form-control"
                                readOnly={this.props.readOnly}
                                name="parentId"
                                value={this.state.parentId}
                                onChange={(e) => this.onCategoryChange(e)}>
                                <option value="0">/所有</option>
                                {//遍历品类列表生成选项
                                    this.state.firstCategoryList.map(
                                        (Category, index) => {
                                            return <option value={Category.id} key={index}>{`/所有/${Category.name}`}</option>;
                                        }
                                    )
                                }
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">品类名称</label>
                        <div className="col-md-3">
                            <input type="text"
                                className="form-control"
                                placeholder="请输入品类名称"
                                name="categoryName"
                                onChange={(e) => this.onCategoryInfoChange(e)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-offset-2 col-md-10">
                            <button type="submit"
                                className="btn btn-primary"
                                onClick={() => this.onSubmit()}
                            >提交</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CategoryAdd