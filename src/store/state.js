const state = {
    classId: '', //首页tab 跳转路由id参数
    buylist:[], //购物车商品列表
    select:[], //购物车商品是否全选  ture and false
    price:0, //购物车提交订单总价
    count:0, //购物车选中的商品总数量
    selectshop:[], //购物车选中的商品
    imgicon:[], //购物车选中的商品的图标
    address:[], //地址
    chosenAddressId:'', //地址勾选选中地址ID
    addressinfo:{}, //编辑地址勾选的默认地址
    editChosenAddressId:'', //编辑地址id
}
export default  state
  
