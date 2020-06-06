let reg = require('./lib/reg');  // 正则对象

let validate = {};

// 将正则对象注册到validate原型链上
validate.reg = reg;

/**
 * 验证方法
 * @param obj 要验证的字段对象 obj.k => 需验证字段 obj.v => 值
 * @return Boolean true or false
 * */
validate.valid = (obj) => {
    console.log(reg);
};


module.exports = validate;