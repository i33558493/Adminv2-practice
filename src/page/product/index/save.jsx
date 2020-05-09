import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import CategorySelector from './category-selector.jsx';
import FileUpload from 'util/file-upload/index.jsx';
import RichEditor from 'util/rich-editor/index.jsx';

import Mutil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';


// import './save.scss';

const _mm = new Mutil();
const _product = new Product();


class ProductSave extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
    }

    //保存通用商品信息状态
    onProductInfoChange(e) {
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({
            [name]: value
        });
    }
    //保存选择品类状态
    onCategoryChange(firstCategoryId, secondCategoryId) {
        this.setState({
            parentCategoryId: firstCategoryId,
            categoryId: secondCategoryId
        });
    }
    //保存上传图片状态
    onSubImagesChange(subImages) {
        this.setState({
            subImages: subImages
        });
    }
    //保存详情变化
    onRichTextChange(newRichText) {
        this.setState({
            detail: newRichText
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
    //提交
    onSubmit(e) {
        //商品参数
        let product = {
            id: this.state.id,
            name: this.state.name,
            subtitle: this.state.subtitle,
            subImages: this.getSubImageString(),
            detail: this.state.detail,
            price: parseFloat(this.state.price),
            stock: parseInt(this.state.stock),
            status: 1,
            categoryId: parseInt(this.state.categoryId),
            parentCategoryId: parseInt(this.state.parentCategoryId)
        }
        //编辑状态下存在商品ID
        if (this.state.id) {
            product.id = this.state.id;
        }
        //验证商品表单 
        let productCheckResult = _product.checkProduct(product);
        //保存商品详情
        if (productCheckResult.status) {
            //校验通过
            _product.saveProduct(product).then(
                (res) => {
                    _mm.successMsgTips(res.data);
                    //跳转页面
                    this.props.history.push('/product');
                },
                (errMsg) => { _mm.errorTips(errMsg) }
            );
        }
        else {
            _mm.errorTips(productCheckResult.msg);
        }
    }
    render() {
        return (
            <div className="container" id="page-wrapper">
                <PageTitle className="page-header" title="商品管理--添加商品" />
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品名称</label>
                        <div className="col-md-5">
                            <input type="text"
                                className="form-control"
                                placeholder="请输入商品名称"
                                name="name"
                                onChange={(e) => this.onProductInfoChange(e)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品描述</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control" placeholder="请输入商品描述"
                                name="subtitle"
                                onChange={(e) => this.onProductInfoChange(e)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">所属分类</label>
                        <div className="col-md-10">
                            <CategorySelector
                                onCategoryChange={
                                    (firstCategoryId, secondCategoryId) => this.onCategoryChange(firstCategoryId, secondCategoryId)
                                } />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品价格</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="请输入商品价格"
                                    name="price"
                                    onChange={(e) => this.onProductInfoChange(e)} />
                                <span className="input-group-addon">元</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品库存</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="请输入商品库存"
                                    name="stock"
                                    onChange={(e) => this.onProductInfoChange(e)} />
                                <span className="input-group-addon">件</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">上传图片</label>
                        <FileUpload onSubImagesChange={(subImages) => this.onSubImagesChange(subImages)} />
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品详情</label>
                        <div className="col-md-10">
                            <RichEditor onRichTextChange={(newRichText) => this.onRichTextChange(newRichText)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-offset-2 col-md-10">
                            <button type="submit"
                                className="btn btn-primary"
                                onClick={(e) => this.onSubmit(e)}
                            >提交</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductSave