import Mutil from 'util/mm.jsx';

const _mm = new Mutil();

//TODO 编写用户服务
class Statistic {
    getHomeCount(){
        return _mm.request({
            url: '/manage/statistic/base_count.do',
        });
    }
}

export default Statistic;