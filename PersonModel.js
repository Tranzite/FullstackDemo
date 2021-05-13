const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    _name: String, // jag har gjort _name för att se skillanden mellan den och name så att dom inte ser ut att vara samma sak, _name = variabel namnet
    _email: String,
    _age: Number
});
  
const Person = mongoose.model('Person', personSchema);

exports.createPerson = (name, email, age) => {
    var person = new Person({
        _name: name, // _name = variabel namnet, name = variabeln .
        _email: email, 
        _age: age 
       })

       return person
}
exports.getAllPeople = async () => {
    let people = await Person.find({})
    return people
}