import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import CategorySelector from './category-selector.jsx';

import Mutil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';

import './detail.scss';

const _mm = new Mutil();
const _product = new Product();


class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.pid,
            categoryId: 0, //二级品类
            name: '',
            subtitle: '',
            subImages: [],
            detail: '',
            price: '',
            stock: '',
            status: 1, //1：商品在售
            parentCategoryId: 0 //一级品类
        }
    }
    componentDidMount() {
        this.loadProduct();
    }

    //当id不为空时代表为编辑页面，需要回填商品详情到表单
    loadProduct() {
        if (this.state.id) {
            _product.getProductDetail(this.state.id).then((res) => {
                //原参数 subImages 是使用 “ , ” 隔开的字符串，使用 split 方法转换成数组，并且过滤去除空元素
                let Images = res.subImages.split(',').filter((subImage) => {
                    return subImage === 'false' ? true : subImage && subImage.trim();
                });
                res.subImages = Images.map((image, index) => {
                    return {
                        uri: image,
                        url: res.imageHost + image
                    }
                });
                this.setState(res);
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            });
        }
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
        let subImg = this.state.subImages.map((subImage, index) => {
            return (
                <div className="detail-wrap--img" key={index}>
                    <img src={subImage.url} alt={`图${index}`} className="detail-img" />
                </div>
            )
        })
        return (
            <div className="container" id="page-wrapper">
                <PageTitle className="page-header" title="商品管理--添加商品" />
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品名称</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.name}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品描述</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.subtitle}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品状态</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.status === 1 ? '在售' : '已下架'}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">所属分类</label>
                        <div className="col-md-10">
                            <CategorySelector
                                readOnly
                                onCategoryChange={(firstCategoryId, secondCategoryId) => this.onCategoryChange(firstCategoryId, secondCategoryId)}
                                categoryId={this.state.categoryId}
                                parentCategoryId={this.state.parentCategoryId}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品价格</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="text"
                                    className="form-control"
                                    name="price"
                                    value={this.state.price}
                                    readOnly />
                                <span className="input-group-addon">元</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品库存</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="text"
                                    className="form-control"
                                    name="stock"
                                    value={this.state.stock}
                                    readOnly />
                                <span className="input-group-addon">件</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品图片</label>
                        <div className="col-md-10">{subImg}</div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品详情</label>
                        <div className="col-md-10"
                            dangerouslySetInnerHTML={{ __html: this.state.detail }}>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductDetail