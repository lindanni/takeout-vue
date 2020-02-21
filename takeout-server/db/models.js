const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/takeout_z')
const conn = mongoose.connection
conn.on('connected',function(){
    console.log('数据库连接成功！')
})
const userSchema = mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    phone: {
        type: String
    }
})
exports.UserModel = mongoose.model('User', userSchema, 'user')
const categorySchema = mongoose.Schema({
    title: {
        type: String
    },
    image_url: {
        type: String
    }
})
exports.CategoryModel = mongoose.model('Category', categorySchema, 'categorys')
const shopSchema = mongoose.Schema({
    name: String,
    description: String,
    deliveryTime: String,
    score: Number,
    serviceScore: Number,
    foodScore: Number,
    minPrice: Number,
    deliveryPrice: Number,
    ratingCount: Number,
    sellCount: Number,
    distance: String,
    bulletin: String,
    supports: Array,
    avatar: String,
    bgImg: String,
    pics: Array,
    category: String,
    phone: Number,
    address: String,
    workTime: String,
    foods: {
        type: mongoose.Types.ObjectId,
        ref: 'foods'
    }
})
exports.ShopModel = mongoose.model('Shop', shopSchema, 'shops')
const orderSchema = mongoose.Schema({
    userid: mongoose.Schema.Types.ObjectId,
    orderdetail: [{
        foodid: mongoose.Types.ObjectId,
        count: Number
    }],
    totalprice: String,
    shopid: mongoose.Schema.Types.ObjectId,
    time: String,
    serverscore: Number,
    foodscore: Number,
    ratingtext: String
})
exports.OrderModel = mongoose.model('Order', orderSchema, 'orders')
const shopcategorySchema = mongoose.Schema({
    name: String,
    shopid: mongoose.Types.ObjectId
})
exports.ShopCategoryModel = mongoose.model('Shopcategory', shopcategorySchema, 'shopcategorys')
const foodSchema = mongoose.Schema({
    name: String,
    price: Number,
    sellCount: Number,
    rating: Number,
    info: String,
    image: String,
    categoryid: mongoose.Types.ObjectId,
    shopid: mongoose.Types.ObjectId
})
exports.FoodModel = mongoose.model('Food', foodSchema, 'foods')