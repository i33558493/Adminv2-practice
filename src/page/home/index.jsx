import React from 'react';
import './index.scss';
import PageTitle from 'component/page-title/index.jsx';
import { Link } from 'react-router-dom';

import Mutil from 'util/mm.jsx';
import Statistic from 'service/statistic.jsx';

const _mm = new Mutil();
const _statistic = new Statistic();


class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userCount: '-',
            productCount: '-',
            orderCount: '-'
        }
    }
    componentDidMount(){
        this.loadCount();
    }
    loadCount(){
        _statistic.getHomeCount().then(
            res => this.setState(res),
            errMsg => _mm.errorTips(errMsg))
    }
    render() {
        return (
            <div className="container" id="page-wrapper"> 
                <PageTitle title="首页" />
                <div className="row">
                    <div className="col-md-4">
                        <Link to='/user' className="colorBox brown">
                            <p className="count">{this.state.userCount}</p>
                            <p className="desc">
                                <span className="icon fa fa-user-o"></span>
                                <span>用户总数</span>
                            </p>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to='/product' className="colorBox green">
                            <p className="count">{this.state.productCount}</p>
                            <p className="desc">
                                <span className="icon fa fa-list-ul"></span>
                                <span>商品总数</span>
                            </p>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to='/order' className="colorBox blue">
                            <p className="count">{this.state.orderCount}</p>
                            <p className="desc">
                                <span className="icon fa fa-check-square-o"></span>
                                <span>订单总数</span>
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home