import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Link, Switch } from 'react-router-dom';

//页面
import ProductList from 'page/product/index/index.jsx';
import ProductSave from 'page/product/index/save.jsx';
// import CategoryList from 'page/product/category/index.jsx';

class ProductRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/product/index" component={ProductList} />
                <Route path="/product/save/:pid" component={ProductSave} />
                <Redirect exact from="/product" to="/product/index" />
                {/* <Route path="/product-category/index" component={ProductList} />
                <Redirect exact from="/product-category" to="/product-category/index" /> */}
            </Switch>
        );
    }
}

export default ProductRouter;
