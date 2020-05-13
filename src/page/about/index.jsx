import React from 'react';
import PageTitle from 'component/page-title/index.jsx';

import './index.scss';

class About extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="container" id="page-wrapper">
                <PageTitle title="关于本系统" />
                <div className="row">
                    <div className="col-md-12">
                        <p>本系统为个人学习 React 的练手作品，仅供展示以及学习交流，不承担任何实际用途。</p>
                        <p>我是一个自学入门的前端新人，现正求职中，有意面试者请联系我。</p>
                        <dl >
                            <dt>作者</dt>
                            <dd>赖灿文</dd>
                            <dt>源码仓库</dt>
                            <dd>
                                <a className="about-a" href="https://github.com/i33558493/Adminv2-practice">Github</a>
                                <a className="about-a" href="https://gitee.com/leolai/Adminv2-practice">Gitee</a>
                            </dd>
                            <dt>联系邮箱</dt>
                            <dd> 328925644@qq.com</dd>
                            <dt>联系电话：</dt>
                            <dd>13129298428</dd>
                        </dl>
                    </div>
                </div>
            </div>
        );
    }
}

export default About