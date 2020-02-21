var express = require('express');
var svgCaptcha = require('svg-captcha');
var router = express.Router();
const _filter = {'password': 0, '__v': 0}
var sms_util = require('../util/sms_util');
var time_util = require('../util/time')
var mongoose = require('mongoose')
const {UserModel, CategoryModel, ShopModel, OrderModel, FoodModel, ShopCategoryModel} = require('../db/models');
const users = {};
/* GET home page. */
//登录
router.post('/login', function(req, res, next) {
    const {username, password} = req.body

    console.log("111");
    console.log(password)
    UserModel.findOne({username, password}, function(error, user){
        if(user){
            res.cookie('userid', user._id,{maxAage: 1000*60*60*24})
            res.send({code: 0, data: user})
        }else{
            console.log(user)
            res.send({code: 1, msg: '用户名或密码不正确'})
        }
    })
});
//获取分类
router.get('/category',function(req, res, next){
    CategoryModel.find(function(error, data){
        if(data){
            res.send({code: 0, data})
        }else{
            console.log(data)
            res.send({code: 1, msg: "没获取到分类数据"})
        }
    })
});
//获取商店信息
router.get('/shoplist', function(req, res, next){
    ShopModel.find(function(error, shoplist){
        if(shoplist && shoplist.length !== 0){
            res.send({code: 0, data: shoplist})
        }else{
            res.send({code: 1, msg: '商品列表获取失败！'})
        }
    })
})

router.get('/shopone', function(req, res, next) {
    var shopid = req.query.shopid;
    console.log(shopid)
    ShopModel.findOne({"_id": new mongoose.Types.ObjectId(shopid)}, function(error, info) {
        if (info) {
            ShopCategoryModel.aggregate([{
                $lookup: {
                    from: 'foods',
                    localField: '_id',
                    foreignField: 'categoryid',
                    as: 'foods'
                }
            },{
                $match: {shopid:  new mongoose.Types.ObjectId(shopid)}
            }],function(error, goods){
                if(goods){
                    return res.send({code: 0, data: {info, goods}})
                }else{
                    return res.send({code: 1})
                }
            })
        }else{
            return res.send({code: 1})
        }
    })
});

router.get('/getcode', function(req, res, next){
    var phone = req.query.phone;
    var code = sms_util.randomCode(6);
    sms_util.sendCode(phone , code, function(success) {
        if (success) {
            users[phone] = code;
            console.log(users)
            res.send({code: 0})
        }else{
            res.send({code: 1, msg: '短信验证码发送失败！'})
        }
    })
})
router.post('/login_note', function (req, res, next) {
    var phone = req.body.phone;
    var phoneCode = req.body.phoneCode;
    if (users[phone] != phoneCode ) {
        console.log(users)
        res.send({code: 1, msg: "手机号或验证码不正确！"})
        return;
    }
    delete users[phone]
    UserModel.findOne({phone}, _filter, function (error, user) {
        if (user) {
            req.session.userid = user._id;
            res.send({code: 0, data: user});
        }else{
            var userModel = new UserModel({phone});
            userModel.save(function (error, user) {
                req.session.userid = user._id;
                res.send({code: 0, data: user})
            })
        }
    })
})
router.get('/get_userinfo', function (req , res, next) {
    var userid = req.session.userid
    UserModel.findOne({_id: userid}, _filter, function (error, user) {
        if (user) {
            console.log(1)
            res.send({code: 0, data: user})
        }else {
            delete req.session.userid
            console.log(2)
            res.send({code: 1, msg: "请先登录！"})
        }
    })
})
router.get('/get_passwordCode', function (req, res, next) {
    var passwordCode = svgCaptcha.create({
        ignoreChars: '0o1i',
        noise: 2,
        color: true
    });
    req.session.passwordCode = passwordCode.text.toLowerCase();
    res.type('svg');
    res.send(passwordCode.data);
})
router.post('/login_pass', function (req, res, next) {
    var passwordCode = req.session.passwordCode;
    var username = req.body.username;
    var password = req.body.password;
    var passwordCode_u = req.body.passwordCode.toLowerCase();
    if (passwordCode != passwordCode_u) {
        return res.send({code: 1, msg: "验证码不正确！"})
    }
    delete req.session.passwordCode;
    UserModel.findOne({username}, function(error ,user) {
        if (user) {
            if (password === user.password) {
                req.session.userid = user._id
                const data = {"_id": user._id, "username": user.username, "phone": user.phone}
                res.send({code: 0, data})
            }else{
                res.send({code: 1, msg: "用户名或密码不正确！"})
            }
        }else{
            res.send({code: 2, msg: "请去绑定手机号！"})
        }
    })
})
router.get('/login_out', function (req, res, next) {
    delete req.session.userid
    res.send({code: 0})
})
router.get('/search_shop', function (req, res, next) {
    var keyword = req.query.keyword;
    const reg = new RegExp(keyword, 'i')
    ShopModel.find({name: {$regex: reg}}, function(error, shops) {
        if (shops && shops.length !==0) {
            res.send({code: 0, data: shops})
        }else{
            res.send({code: 1, msg: "没有搜索到商店！"})
        }
    })
})
router.post('/saveorder', function(req, res, next) {
    var orderdetail = req.body.orderdetail;
    var userid = req.session.userid;
    var totalprice  = req.body.totalprice;
    var shopid = req.body.shopid;
    var orderModel = new OrderModel({
        orderdetail,
        userid,
        totalprice,
        shopid,
        time: time_util.formatDate()
    })
    orderModel.save(function (error, order) {
        if(order) {
            console.log(1)
            return res.send({code: 0, data: order});
        }else {
            console.log(2)
            return res.send({code: 1});
        }
    })
})
router.post('/bangphone', function(req, res, next) {
    var userid = req.session.userid;
    var phone = req.body.phone;
    var phoneCode = req.body.phoneCode;
    var username = req.body.username;
    var password = req.body.password;
    if (users[phone] != phoneCode ) {
        console.log(users)
        res.send({code: 1, msg: "手机号或验证码不正确！"})
        return;
    }
    delete users[phone]
    var userModel = new UserModel({
        username,
        password,
        phone
    });
    UserModel.findOne({phone}, function(error, user) {
        if (user) {
            UserModel.findByIdAndUpdate(user._id,{username, password}, function(error, user) {
                if (user) {
                    req.session.userid = user._id;
                    res.send({code: 0, data: user});
                }else{
                    res.send({code: 1})
                }
            })
        }else{
            userModel.save(function(error, user) {
                req.session.userid = user._id;
                res.send({code: 0, data: user});
            })
        }
    })
})

router.get('/get_orderlist', function(req, res, next) {
    var userid = req.session.userid;
    OrderModel.aggregate([
        {
            $lookup: {
                from: "shops",
                localField: "shopid",
                foreignField: "_id",
                as: "shopinfo"
            }
        },
        {
            $lookup: {
                from: "user",
                localField: "userid",
                foreignField: "_id",
                as: "user"
            }
        }, {
            $lookup: {
                from: 'foods',
                localField: "orderdetail.foodid",
                foreignField: '_id',
                as: 'food'
            }
        },{
            $match: {userid: new mongoose.Types.ObjectId(userid)}
        }],function(error, orderlist) {
        if (orderlist && orderlist.length !==0) {
            return res.send({code: 0, data: orderlist})
        }else{
            return res.send({code: 1, msg: "没有的得到订单列表！"})
        }
    })
})

router.get('/search_order', function(req, res, next) {
    var keyword = req.query.keyword;
    var userid = req.session.userid;
    const reg = new RegExp(keyword, 'i')
    OrderModel.aggregate([{
        $lookup: {
            from: "shops",
            localField: "shopid",
            foreignField: "_id",
            as: "shopinfo"
        }},
        {
            $lookup: {
                from: "user",
                localField: "userid",
                foreignField: "_id",
                as: "user"
            }
        }, {
            $lookup: {
                from: 'foods',
                localField: "orderdetail.foodid",
                foreignField: '_id',
                as: 'food'
            }
        }, {
        $match: {userid: new mongoose.Types.ObjectId(userid), 'shopinfo.name': {$regex: reg}}
    }],function(error, orderlist) {
        if (orderlist && orderlist.length !==0) {
            return res.send({code: 0, data: orderlist})
        }else{
            return res.send({code: 1, msg: "没有搜索到订单列表！"})
        }
    })
})

router.post('/saveRating', function(req, res, next) {
    var serverscore = req.body.serverscore;
    var foodscore = req.body.foodscore;
    var ratingtext = req.body.ratingtext
    var orderid = req.body.orderid
    OrderModel.findByIdAndUpdate(orderid, {
        serverscore,
        foodscore,
        ratingtext
    },function(error, order) {
        if (order) {
            res.send({code: 0})
        }else{
            res.send({code: 1})
        }
    })
})

router.post('/update_sellcount', function(req, res, next) {
    var orderdetail = req.body.orderdetail;
    var shopid = req.body.shopid;
    console.log(orderdetail)
    console.log(typeof orderdetail)
    var shopid = req.body.shopid;
    console.log(shopid);
    var allcount = 0;
    var ok = 0;
    orderdetail.forEach((order, index) => {
        var foodid = order.foodid;
        var count = order.count;
        console.log(foodid);
        console.log(count);
        FoodModel.findOne({'_id': new mongoose.Types.ObjectId(foodid)},function(error, food) {
            if(food){
                var sellCount = parseInt(food.sellCount) + parseInt(count);
                console.log("sellcount1="+food.sellCount +'+'+count)
                FoodModel.updateOne({'_id': new mongoose.Types.ObjectId(foodid)},{sellCount},function(error ,food) {
                    allcount += count;
                    if (index === orderdetail.length-1) {
                        ShopModel.findOne({'_id': new mongoose.Types.ObjectId(shopid)},function(error, shopinfo) {
                            if(shopinfo){
                                var allsellCount = parseInt(shopinfo.sellCount) + parseInt(allcount);
                                console.log("allsellcount"+shopinfo.sellCount +'+'+allcount);
                                console.log(allcount)
                                ShopModel.updateOne({'_id': new mongoose.Types.ObjectId(shopid)},{sellCount: allsellCount},function(error, shop){
                                    if (shop) {
                                        return res.send({code: 0, data: ok})
                                    }else{
                                        return res.send({code: 1, msg: "销量更新失败！"})
                                    }
                                })
                            }
                        })
                    }
                })
            }
        });
    })
})

router.get('/del_order', function(req, res, next) {
    var orderid = req.query.orderid;
    OrderModel.deleteOne({'_id': new mongoose.Types.ObjectId(orderid)}, function(error, order) {
        if (order) {
            console.log(order)
            res.send({code: 0})
        }else{
            res.send({code: 1})
        }
    })
})
module.exports = router;
