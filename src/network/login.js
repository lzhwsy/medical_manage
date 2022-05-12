import {request} from './request'

export function LoginRequest(username,password){
    return request({
        url:'/login/loginData',
        method:'POST',
        data: {
            username,
            password
        },

    })
}

export function RegisterRequest(userProfile){
    return request({
        url:'/login/register',
        method:'POST',
        data:{
            userProfile
        }
    })
}
