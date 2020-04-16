import React from 'react';
import RcPagination from 'rc-pagination';
import 'rc-pagination/dist/rc-pagination.min.css';

class Pagination extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    {/* TAB 此处曾选择2.2.0版本的 Pagination ，结果无法正常显示当前页 */}
                    <RcPagination {...this.props}
                        hideOnSinglePage
                        showQuickJumper
                        // defaultPageSize={20}
                        // defaultCurrent={1}
                    />
                </div>
            </div>
        )
    }
}

export default Pagination;