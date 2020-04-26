import React from 'react';

class TableList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFirstLoading : true
        }
    }
    //KNOW 原教程使用生命周期方法 componentWillReceiveProps，官方档案将其标为过期方法
    componentWillReceiveProps() {
        this.setState({
            isFirstLoading : false
        });
    }
    render() {
        let list = this.props.children;
        let listInfo = (
            <tr>
                <th className="text-center" colSpan={this.props.tableHeads.length}>
                    {this.state.isFirstLoading ? '正在加载中~' : '没有找到相应的结果！'}
                </th>
            </tr>
        );
        let tableBody = list.length > 0 ? list : listInfo;
        //传入的表头信息若为对象，则包括了列名和列宽等；若为字符串则仅包括列名
        let tableHeader = this.props.tableHeads.map(
            (tableHead, index) => {
                if(typeof tableHead === 'object'){
                    return (<th key={index} width={tableHead.width}>{tableHead.name}</th>);
                }else if(typeof tableHead === 'string'){
                    return (<th key={index}>{tableHead}</th>);
                }
            }
        );
        return (
            <table className="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        {tableHeader}
                    </tr>
                </thead>
                <tbody>
                    {tableBody}
                </tbody>
            </table>
        )
    }
}

export default TableList;