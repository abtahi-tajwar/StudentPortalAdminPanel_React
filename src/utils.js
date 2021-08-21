function duration(t0, t1){
    let d = (new Date(t1)) - (new Date(t0));
    let weekdays     = Math.floor(d/1000/60/60/24/7);
    let days         = Math.floor(d/1000/60/60/24 - weekdays*7);
    let hours        = Math.floor(d/1000/60/60    - weekdays*7*24            - days*24);
    let minutes      = Math.floor(d/1000/60       - weekdays*7*24*60         - days*24*60         - hours*60);
    let seconds      = Math.floor(d/1000          - weekdays*7*24*60*60      - days*24*60*60      - hours*60*60      - minutes*60);
    let milliseconds = Math.floor(d               - weekdays*7*24*60*60*1000 - days*24*60*60*1000 - hours*60*60*1000 - minutes*60*1000 - seconds*1000);
    let t = {};
    ['weekdays', 'days', 'hours', 'minutes', 'seconds', 'milliseconds'].forEach(q=>{ if (eval(q)>0) { t[q] = eval(q); } });
    return t;
}
export function howManyTimeAgo(time) {
    console.log(time)
    let data = duration(time, Date.now())
    let resultString = ""
    if(data.weekdays > 0) {
        resultString = `${data.weekdays} weeks ago`
    } else if(data.days > 0) {
        resultString = `${data.days} days ago`
    } else if(data.hours > 0) {
        resultString = `${data.hours} hours ago`
    } else if(data.minutes > 0) {
        resultString = `${data.minutes} minutes ago`
    } else if(data.hours > 0) {
        resultString = `${data.hours} hours ago`
    } else {
        resultString = `Just Now`
    }
    console.log(resultString)
    return resultString
}