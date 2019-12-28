const moment = require('moment');

let generateMessage = (from,content) =>{
    return {
        from: from,
        content:content,
        createdAt: moment().valueOf()
    };
}

let generateLocationMessage = (from,lat,lng)=>{
    return {
        from:from,
        url:`https://www.google.com/maps?q=${lat}, ${lng}`,
        createdAt: moment().valueOf()
    };
}

module.exports = {generateMessage,generateLocationMessage}