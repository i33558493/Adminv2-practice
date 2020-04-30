import React from 'react';
import Simditor from 'simditor';

import 'simditor/styles/simditor.scss';

import Mutil from 'util/mm.jsx';

const _mm = new Mutil();

class RichEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
        this.loadSimditor();
    }
    componentWillReceiveProps(nextProps) {
        //从父组件设置内容
        if (typeof nextProps.defaultText === 'string' //类型校验
            && this.props.defaultText !== nextProps.defaultText) { //变化校验
            this.editor.setValue(this.props.defaultText); //对编辑器赋值
        }
    }
    //初始化富文本编辑器
    loadSimditor() {
        //创建文本编辑器
        let element = this.refs["textarea"];
        this.editor = new Simditor({
            textarea: element,
            placeholder: this.props.placeholder || '请输入内容……',
            defaultImage: '',
            upload: {
                url: '/manage/product/upload.do',
                fileKey: 'upload_file',
                leaveConfirm: '图片正在上传中，请问你要此时离开页面吗？'
            }
        });
        this.bindEditorEvent();
    }
    //绑定编辑器事件
    bindEditorEvent() {
        this.editor.on('valuechanged', (e) => {
            //传出文本内容到父组件
            this.props.onRichTextChange(this.editor.getValue());
        })
    }

    render() {
        return (
            <textarea ref="textarea">
            </textarea>
        )
    }
}

export default RichEditor;
