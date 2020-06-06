let reg = require('./reg');  // 引入正则对象

let $validator = {};  // 创建验证器对象

$validator.reg = reg;  // 将正则对象赋值给$validator.reg
$validator.errors = [];  // 定义错误信息数组

/**
 * 自定义验证
 * @param field
 * @param obj { message: '', validate: callback() }
 * 第二个参数为obj对象,message为验证不通过时自定义的提示消息,validate为自定义的验证方法
 * @return Boolean or Object
 * */
$validator.extend = function (field, obj) {

};

/**
 * 验证方法(异步)
 * @param obj 要验证的字段对象 obj.k => 需验证字段 obj.v => 值
 * @return Promise
 * */
$validator.validate = function (obj) {
    return new Promise((resolve, reject) => {
        console.log('k: a, v: ', obj.a);
        console.log('reg ', this.reg);
    });
};

/**
 * 验证方法(同步)
 * 1.默认进行非空验证(必须)
 * 2.是否特殊字符、是否是合法的Email、合法的手机号、合法的电话号码、合法的URL等都是可选的
 * @param fieldObj 要验证的字段对象 obj.k => 需验证字段 obj.v => 值
 * @param attr 字段对应的中文名称(可选)
 * @return Boolean or Object
 * */
$validator.validateSync = function (fieldObj, attr = {}) {
    // 第一步默认进行非空验证
    if (this.reg.isString(fieldObj) && !this.reg.isEmpty(fieldObj)) {
        this.errors.push('不能为空！');
        return;
    }
    if (this.reg.isObj(fieldObj)) {
        Object.keys(fieldObj).forEach(k => {
            if (this.reg.isEmpty(fieldObj[k])) {
                if (JSON.stringify(attr) !== '{}') {
                    this.errors.push(`${attr[k]}不能为空！`);  // 如果用户有传字段对应的中文名称则使用该名称
                } else {
                    this.errors.push(`${k}不能为空！`);
                }
            }
        });
    }
    return this.errors.length === 0 ? true : this.errors;
};

module.exports = $validator;