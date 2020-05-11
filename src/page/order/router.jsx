import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

//页面
import OrderList from 'page/order/index.jsx';
import OrderDetail from 'page/order/detail.jsx';

class OrderRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/order/index" component={OrderList} />
                <Route path="/order/detail/:orderNO" component={OrderDetail} />
                <Redirect exact from="/order" to="/order/index" />
            </Switch>
        );
    }
}

export default OrderRouter;
