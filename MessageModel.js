const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    _name: String, // jag har gjort _name för att se skillanden mellan den och name så att dom inte ser ut att vara samma sak, _name = variabel namnet
    _message: String,
    
});
  
const Message = mongoose.model('Message', messageSchema);

exports.createMessage = (name, message) => {
    var message = new Message({
        _name: name, // _name = variabel namnet, name = variabeln .
        _message: message, 
        
       })

       return person
}
exports.getAllMessage = async () => {
    let message = await Message.find({})
    return message
}