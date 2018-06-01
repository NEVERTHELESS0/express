var userApi=require('../dao/userDAO')

exports.login=function (req,res) {
    var naame=req.body.name
    var paw=req.body.password
    userApi.getById(naame,function (data) {
        if(data.code==0){
            res.end(JSON.stringify(data))
            return
        }
        console.log(data)
        data=data.data;
        console.log(data)
        if(data.length<1){
            var data={}
            data.code=0
            data.msg="账号不存在"
        }else{
            var pawme=data[0].password
            var data={}
            if(pawme!=paw){
                data.code=0
                data.msg="密码错误"
            }else if(pawme==paw){
                data.code=1
                data.msg="正确"
            }else{
                data.code=0
                data.msg="未知异常"
            }
        }


        res.end(JSON.stringify(data));
    })
}
exports.register=function (req,res) {
    var naame=req.body.name
    var paw=req.body.password

    console.log(naame,paw)
    userApi.installuse({username:naame,password:paw},function (data) {
        console.log("dasdasddsas")
        console.log(data)
        res.end(JSON.stringify(data));
    })
}
exports.subSpending=function (req,res) {
    var data=req.body
    console.log(req.body)
    var dataVal = [];
    var datakey = ''
    var date=data.date
    var dataSet=''
    for (let i in data) {
        datakey += i + ','
        dataVal.push(data[i])
        dataSet+= i+'=?,'
    }
    console.log(datakey)
    console.log(dataVal)
    datakey=datakey.substr(0,datakey.length-1)
    dataSet=dataSet.substr(0,dataSet.length-1)
    userApi.selectXiaofei(date,function (data) {
        console.log("dasdasddsas")
        console.log(data)
        if(data.code==0){
            res.end(JSON.stringify(data));
        }else {
            if(data.data.length>0){
                dataVal.push(date)
                userApi.updateXiaofei(dataSet,dataVal,function (data) {
                        res.end(JSON.stringify(data));
                })
            }else{
                userApi.inistallXiaofei(datakey,dataVal,function (data) {
                    res.end(JSON.stringify(data));
                })
            }
        }
    })
}
exports.getSpending=function (req,res) {
    console.log(req.body)
    userApi.selectXiaofei(req.body.date,function (data) {
        console.log("dasdasddsas")
        console.log(data)
        res.end(JSON.stringify(data));
    })
}
exports.getSumByDate=function (req,res) {
    console.log(req.body)
    userApi.getSumByDate(req.body.month,req.body.nextmonth,function (data) {
        console.log("dasdasddsas2")
        console.log(data)
        res.end(JSON.stringify(data));
    })
}