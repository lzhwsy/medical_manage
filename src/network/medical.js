import {request} from './request'

//药品数据
export function MedicalAll(queryInfo, type, smallType) {
    return request({
        url: '/medical/TCMedical',
        method: 'POST',
        data: {
            type,
            queryInfo,
            smallType
        }
    })
}

//添加药品
export function AddMedicalItem(form) {
    return request({
        url: '/medical/AddMedicalItem',
        method: 'POST',
        data: {
            form
        }
    })
}

//编辑药品类型
export function EditMedical(item) {
    let id = item.goods_id
    return request({
        url: '/Medical/EditMedical/' + id,
        method: 'PUT',
        data: {
            item
        }
    })
}

//删除药品
export function DeleteMedicalItem(goods_id) {
    return request({
        url: '/medical/DeleteMedicalItem',
        method: 'DELETE',
        data: {
            goods_id
        }
    })
}

//获取药品类型
export function MedicalType(type) {
    return request({
        url: '/medical/MedicalType/' + type,
        method: 'GET',
    })
}

//编辑药品类型
export function EditMedicalType(item) {
    let id = item.id
    return request({
        url: '/Medical/EditMedicalType/' + id,
        method: 'PUT',
        data: {
            item
        }
    })
}

// 药品分类
export function MedicalCateList() {
    return request({
        url: '/medical/MedicalCateList',
        method: 'POST',
    })
}

// 药品规格
export function MedicalSize() {
    return request({
        url: '/medical/MedicalSize',
        method: 'POST',
    })
}

//添加药品列表
export function AddMedicalCateList(form) {
    return request({
        url: '/medical/AddMedicalCateList',
        method: 'POST',
        data: {
            form
        }
    })
}

//删除药品列表
export function DeleteCateList(id) {
    return request({
        url: '/medical/DeleteCateList/' + id,
        method: 'DELETE',
    })
}


