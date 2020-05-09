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
    //校验商品详情参数
    checkProduct(product) {
        //校验类型，取值范围等
        //校验商品名称
        if (typeof product.name !== 'string' || product.name.length === 0) {
            return {
                status: false,
                msg: '商品名称不能为空。'
            };
        }
        //校验商品描述
        if (typeof product.subtitle !== 'string' || product.subtitle.length === 0) {
            return {
                status: false,
                msg: '商品描述不能为空。'
            };
        }
        //校验商品二级品类
        if (typeof product.categoryId !== 'number' || product.categoryId <= 0) {
            return {
                status: false,
                msg: '请先选择商品品类。'
            };
        }
        //校验商品价格
        //KNOW 需要考虑数字取值为 NaN 的情况，此时该值既不大于等于零也不小于零
        if (typeof product.price !== 'number' || !(product.price >= 0)) {
            return {
                status: false,
                msg: '请正确填写商品价格。'
            };
        }
        //校验商品库存
        if (typeof product.stock !== 'number' || !(product.stock >= 0)) { 
            return {
                status: false,
                msg: '请正确填写商品库存。'
            };
        }
        return {
            status: true,
            msg: '商品详情参数验证通过。'
        }
    }

    //保存商品
    saveProduct(product) {
        return _mm.request({
            type: 'post',
            url: '/manage/product/save.do',
            data: product
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