class MUtil {
    request(param){
        //注意使用 return 返回 promise 对象
        return new Promise((resolve,reject) => {
            $.ajax({
                //从参数param中取要发送的值，没有则取此处设置的默认值
                type : param.type || 'get',
                url : param.url || '',
                dataType : param.dataType || 'json',
                data : param.data || null,
                success(res){
                    //数据请求成功
                    if(0 === res.status){
                        //KNOW  && 操作符：前一个条件为真则执行后面的·语句
                        typeof resolve === 'function' && resolve(res.data, res.msg);
                    }
                    //没有登录状态，转到登录
                    else if(10 === res.status){
                        this.doLogin();
                    }
                    //其余情况视为错误
                    else{
                        // throw new Error(res.msg || res.data);
                        //KNOW ajax 方法本身是个异步操作，在异步操作内抛出的错误无法被 Promise 捕捉
                        //改用 reject 方法处理错误信息
                        reject(res.msg || res.data);
                    }
                },
                error(err){
                    //错误状态
                    // throw err.status;
                    reject(err.status);
                }
            });
        });
    }
    //跳转登录
    doLogin(){
        //传入登录前页面地址参数以便跳转登录时取值
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
    }
    //跳转登录
    getUrlParam(name){
        //param=123&param1=456
        let queryString = window.location.search.split('?')[1] || '';
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)' );
        let result = queryString.match(reg);
        console.log(result);
        //match 方法返回一个 Array，如果未找到匹配则为 null
        //无结果本方法返回 null
        return result ? encodeURIComponent(result[2]) : null;
    }
    //错误提示
    errorTips(errMsg){
        alert(errMsg || '好像哪里不对了~');
    }
    //本地存储
    setStorage(name,data){
        //KNOW 本地存储的键对值总以 string 形式存在
        let dataType = typeof data;
        //若为对象对其序列化
        if(dataType === 'object'){
            window.localStorage.setItem(name,JSON.stringify(data));
        }
        //基础类型直接写入
        else if(['number','boolean','string'].indexOf(dataType) >= 0){
            window.localStorage.setItem(name,data);
        }
        //其他类型显示不支持
        else{
            alert('该类型不能用于本地存储。');
        }
    }
    //取出本地存储
    getStorage(name){
        let data = window.localStorage.getItem(name);
        if(data){
            return JSON.parse(data);
        }
        else{
            return '';
        }
    }
    //删除本地存储
    removeStorage(name){
        window.localStorage.removeItem(name);
    }
}

export default MUtil;
