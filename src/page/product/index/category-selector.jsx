import React from 'react';
import './category-selector.scss';

import Mutil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';

const _mm = new Mutil();
const _product = new Product();

//品类选择器
class CategorySelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstCategoryList: [],
            firstCategoryId: 0,
            secondCategoryList: [],
            secondCategoryId: 0
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
            _mm.errMsgTips(errMsg);
        });
    }
    //加载二级节点
    loadSecondCategoryList() {
        if (this.state.firstCategoryId > 0) {
            _product.getCategoryList(this.state.firstCategoryId).then((res) => {
                this.setState({
                    secondCategoryList: res
                });
            }, (errMsg) => {
                _mm.errMsgTips(errMsg);
            });
        }
    }
    //选择一级品类
    onFirstCategoryChange(e) {
        //设置一级品类状态，清空二级品类状态
        this.setState({
            firstCategoryId: e.target.value,
            secondCategoryId: 0,
            secondCategoryList: []
        }, (e) => {
            //完成状态操作后，刷新二级品类，传递一级品类
            this.loadSecondCategoryList();
            this.onPropsCategoryChange();
        });
    }
    //选择二级品类
    onSecondCategoryChange(e) {
        this.setState({
            secondCategoryId: e.target.value
        }, (e) => this.onPropsCategoryChange()
        );
    }
    //传递品类给父组件
    onPropsCategoryChange() {
        //判断 props 里的相关参数是否为方法
        let isCategoryChangeable = typeof this.props.onCategoryChange ==='function' ? true : false;
        //传递
        //如果有二级品类
        if (this.state.secondCategoryId) {
            isCategoryChangeable && this.props.onCategoryChange(this.state.firstCategoryId, this.state.secondCategoryId);
        }
        //没有二级品类
        else {
            isCategoryChangeable && this.props.onCategoryChange(this.state.firstCategoryId, 0);
        }
    }

    render() {
        return (
            <div className="component-wrap">
                <select className="form-control category-select"
                    value={this.state.firstCategoryId}
                    onChange={(e) => this.onFirstCategoryChange(e)}>
                    <option value="0">请选择一级品类</option>
                    {
                        this.state.firstCategoryList.map(
                            (Category, index) => {
                                return <option value={Category.id} key={index}>{Category.name}</option>;
                            }
                        )
                    }
                </select>
                {/* 如果二级品类没有获取列表，隐藏二级品类多选框 */}
                <select className={`form-control category-select ${this.state.secondCategoryList.length ? 'show' : 'hidden'}`}
                    value={this.secondCategoryId}
                    onChange={(e) => this.onSecondCategoryChange(e)}>
                    <option value="">请选择二级品类</option>
                    {
                        this.state.secondCategoryList.map(
                            (Category, index) => {
                                return <option value={Category.id} key={index}>{Category.name}</option>;
                            }
                        )
                    }
                </select>
            </div>
        )
    }
}

export default CategorySelector;