import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Redirect, Link, Switch } from 'react-router-dom';

import Layout from 'component/layout/index.jsx';
//页面
import Home from 'page/home/index.jsx'

class App extends React.Component {
    render() {
        return (
            <Router>
                <Layout>
                    {/* Switch 有两个作用：1.Router 标签只允许包含一个元素，此处用 Switch 标签包含；2.保证只匹配一个路由结果，避免指向 "/" 时重复跳转 */}
                    <Switch>
                        {/* 首页的路由 */}
                        <Route exact path="/" component={Home} />
                        {/* 指定任意路径都默认跳转到首页 */}
                        {/* <Redirect from="*" to="/" /> */}
                    </Switch>
                </Layout>
            </Router>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);