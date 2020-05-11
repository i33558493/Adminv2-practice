import Mutil from 'util/mm.jsx';

const _mm = new Mutil();

class Order {
    //获取订单列表
    getOrderList(listPram) {
        let url = '', data = {};
        //按关键字搜索列表
        if (listPram.listType === 'search') {
            url = '/manage/order/search.do';
            data.orderNo = listPram.orderNo;
        } 
        //按页数请求列表
        else if (listPram.listType === 'list') {
            url = '/manage/order/list.do';
            data.pageNum = listPram.pageNum;
        }
        console.log(data);
        //注意使用 return 返回 promise 对象
        return _mm.request({
            type: 'post',
            url: url,
            data: data
        });
    }
    //获取订单详情
    getOrderDetail(orderNo) {
        return _mm.request({
            type: 'post',
            url: '/manage/order/detail.do',
            data: {
                orderNo: orderNo
            }
        });
    } 
}
export default Order;