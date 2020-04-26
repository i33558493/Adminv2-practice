import Mutil from 'util/mm.jsx';

const _mm = new Mutil();

class Product {
    getProductList(listPram) {
        //TODO 完成方法改造
        let url = '', data = {};
        if (listPram.listType === 'search') {
            url = '/manage/product/search.do';
            data = {
                [listPram.searchType]: listPram.searchKeyword,
                pageNum: listPram.pageNum
            };
        } else if (listPram.listType === 'list') {
            url = '/manage/product/list.do';
            data = {
                pageNum: listPram.pageNum
            };
        }
        //注意使用 return 返回 promise 对象
        return _mm.request({
            type: 'post',
            url: url,
            data: data
        });
    }
    onSetProductStatus(productId, status) {
        return _mm.request({
            type: 'post',
            url: '/manage/product/set_sale_status.do',
            data: {
                productId: productId,
                status: status
            }
        });
    }
}

export default Product;