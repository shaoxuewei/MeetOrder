import fetch from 'common/js/util.js'
import url from 'common/js/config.js'
export function updatemeeting(body){
    return fetch.post(url+"/updatemeeting",body)
}
export function getmeetstate(body){
        return fetch.post(url+"/getmeetingbyopenidandstate",body)
}