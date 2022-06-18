import {request} from './request'

//获取订单列表
export function OrderList(queryInfo) {
    return request({
        url: '/order/OrderList',
        method: 'POST',
        data: {
            queryInfo,
        }
    })
}
