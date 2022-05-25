import {request} from './request'

export function HomeList(){
    return request({
        url:'/home/homeList',
        method:'POST',
    })
}

export function DoctorUser(queryInfo){
    console.log(queryInfo)
    return request({
        url:'/home/doctorUser',
        method:'POST',
        data:{
            profession:'doctor',
            queryInfo
        }
    })
}

export function ConsumerUser(queryInfo){
    return request({
        url:'/home/consumerUser',
        method:'POST',
        data:{
            profession:'consumer',
            queryInfo
        }
    })
}
export function EditDialog(item){
    let id = item.user_id
    return request({
        url:'/home/EditUser/'+ id,
        method:'PUT',
        data:{
            item
        }
    })
}
export function DeleteUser(id){
    return request({
        url:'/home/DeleteUser/'+ id,
        method:'DELETE',
    })
}

