import fetch from 'common/js/util.js'
import url from 'common/js/config.js'
export function getRoomList(Params){
    return fetch.get(url+"/getroom")
}
export function getRoomCount(){
    return fetch.get(url+'/getroomcount')
}
