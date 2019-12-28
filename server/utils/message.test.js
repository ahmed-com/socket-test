let expect = require('expect');
let {generateMessage,generateLocationMessage} = require('./message');

describe('Generate Message' ,()=>{
    it('should generate correct message object',()=>{
        let from = 'ahmed',
            content = 'some random text',
            message =generateMessage(from,content);
        
        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from,content});
    });
});

describe('generate location message',()=>{
    it('it should generate correct location object',()=>{
        let from = 'anyone',
            lat = 12,
            lng = 83,
            url = `https://www.google.com/maps?q=${lat}, ${lng}`,
            message = generateLocationMessage(from,lat,lng);
        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from,url});
    });
});