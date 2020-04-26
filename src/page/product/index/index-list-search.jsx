import React from 'react';
import './index-list-search.scss';
//TODO 待添加状态和事件方法
class ListSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchType: 'productId', //'productId' / 'productName'
            searchKeyword: ''
        }
    }

    onValueChange(e) {
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({
            [name]: value
        });
    }
    //把搜索类型和关键字传递给父组件
    onSearch(e){
        this.props.onSearch(this.state.searchType, this.state.searchKeyword);
    }
    onSearchKeywordKeyUp(e){
        if(e.keyCode === 13){
            this.onSearch();
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12 search-wrap">
                    <div className="form-inline">
                        <div className="form-group">
                            <select className="form-control"
                                name="searchType"
                                onChange={(e) => this.onValueChange(e)}>
                                <option value="productId">按商品ID查询</option>
                                <option value="productName">按商品名称查询</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input type="text"
                                className="form-control"
                                name="searchKeyword"
                                placeholder="搜索关键字"
                                onChange={(e) => this.onValueChange(e)}
                                onKeyUp={(e) => this.onSearchKeywordKeyUp(e)} />
                        </div>
                        <button className="btn btn-primary"
                            onClick={(e) => this.onSearch(e)}>
                            搜索</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListSearch;