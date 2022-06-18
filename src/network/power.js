import {request} from './request'

export function RightsList(type){
    console.log(type)
    return request({
        url:'/power/RightsList/' + type,
        method:'GET',
    })
}


export function RoleAdd(userProfile){
    console.log(userProfile)
    return request({
        url:'/power/RoleAdd',
        method:'POST',
        data:{
            userProfile
        }
    })
}

export function DeleteRole(id){
    return request({
        url:'/power/DeleteRole/'+ id,
        method:'DELETE',
    })
}
