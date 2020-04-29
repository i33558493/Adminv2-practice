import Mutil from 'util/mm.jsx';

const _mm = new Mutil();

class Product {
    //获取商品列表
    getProductList(listPram) {
        let url = '', data = {};
        data.pageNum = listPram.pageNum;
        if (listPram.listType === 'search') {
            url = '/manage/product/search.do';
            data[listPram.searchType] = listPram.searchKeyword;
        } else if (listPram.listType === 'list') {
            url = '/manage/product/list.do';
        }
        //注意使用 return 返回 promise 对象
        return _mm.request({
            type: 'post',
            url: url,
            data: data
        });
    }
    //更改商品状态
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

    /*
    * 品类相关
    */

    //获取品类列表
    getCategoryList(parentCategoryId) {
        return _mm.request({
            type: 'post',
            url: '/manage/category/get_category.do',
            data: {
                categoryId: parentCategoryId || 0
            }
        });
    }
}

export default Product;