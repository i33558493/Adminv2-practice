import React from 'react';
import FileUpload from './file-upload.jsx';

import Mutil from 'util/mm.jsx';

import './index.scss';

const _mm = new Mutil();

class FileUploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subImages: []
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.state.subImages !== nextProps.subImages) {
            this.setState({
                subImages: nextProps.subImages
            });
        }
    }
    //图片上传成功
    onUploadSuccess(res) {
        //加载图片信息
        let subImages = this.state.subImages;
        subImages.push(res.data);
        this.setState({
            subImages: subImages
        });
        //返回图片信息到父组件
        this.onSubImagesChange();
    }
    //图片上传失败
    onUploadFailed(err) {
        //该方法可以捕获 success 回调方法的错误；疑似 Promise.catch 方法实现，待考证
        //判断 err 类型以便提取错误信息文本
        let errMsg = typeof err === 'string' ? err : err.msg;
        _mm.errorTips(errMsg);
    }
    //删除图片
    subImagesDelete(index) {
        let subImages = this.state.subImages;
        subImages.splice(index, 1);
        this.setState({
            subImages: subImages
        });
    }
    //返回上传图片到父组件
    onSubImagesChange() {
        //验证 props 传入方法类型正确否
        if (typeof this.props.onSubImagesChange === 'function') {
            this.props.onSubImagesChange(this.state.subImages);
        }
    }
    render() {
        //图片预览
        let subImg = this.state.subImages.map((subImage, index) => {
            return (
                <div className="fileUploader-wrap--img" key={index}>
                    <img src={subImage.url} alt={`图${index}`} className="fileUploader-img" />
                    <i className="fa fa-times"onClick={(e) => this.subImagesDelete(index)}></i>
                </div>
            )
        })
        //FileUpload 组件参数
        let options = {
            baseUrl: '/manage/product/upload.do',
            fileFieldName: 'upload_file',
            dataType: 'json',
            chooseAndUpload: true,
            /*上传成功*/
            uploadSuccess: (res) => this.onUploadSuccess(res),
            /*xhr失败*/
            uploadFail: (err) => this.onUploadFailed(err),
            uploadError: (err) => this.onUploadFailed(err)
        }

        return (
            <div className="col-md-5">
                {subImg}
                <FileUpload options={options} >
                    <button className="btn btn-default" ref="chooseAndUpload">上传图片</button>
                </FileUpload >
            </div>
        )
    }
}

export default FileUploader;
