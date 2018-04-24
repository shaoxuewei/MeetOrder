import fetch from 'common/js/util.js'
import url from 'common/js/config.js'
export function getOrderDetail(ID){
    return fetch.get(url+"/getroombyid?roomId="+ID)
}
export function getstatebyMEET(OBJ){
    return fetch.post(url+"/getstatebymeetidanddate",OBJ)
}
export function getUserCont(CODE){
    return fetch.get(url+"/wechart?code="+CODE)
}
export function getinsertmeeting(MSG){
    return fetch.post(url+'/insertmeeting',MSG)
}
export function StateController(ID){
    return fetch.get(url+'/getStateByMeetIdForDate'+'?stateRoomId='+ID)
} 
export function UploadImg(MSG,ext){
    return fetch.post(url+'/UploadImg?ext='+ext,MSG)
}
export function getImg(){
    return fetch.get(url+'/getexamineImg')
}
