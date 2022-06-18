import {request} from './request'

export function HomeList(){
    return request({
        url:'/user/homeList',
        method:'POST',
    })
}

export function DoctorUser(queryInfo){
    console.log(queryInfo)
    return request({
        url:'/user/doctorUser',
        method:'POST',
        data:{
            profession:'doctor',
            queryInfo
        }
    })
}

export function ConsumerUser(queryInfo){
    return request({
        url:'/user/consumerUser',
        method:'POST',
        data:{
            profession:'consumer',
            queryInfo
        }
    })
}

export function userIsLoginChanged(item){
    console.log(item)
    let id = item.user_id
    return request({
        url:'/user/userIsLoginChanged/'+ id,
        method:'PUT',
        data:{
            item
        }
    })
}

export function EditDialog(item){
    let id = item.user_id
    return request({
        url:'/user/EditUser/'+ id,
        method:'PUT',
        data:{
            item
        }
    })
}
export function DeleteUser(id){
    return request({
        url:'/user/DeleteUser/'+ id,
        method:'DELETE',
    })
}



