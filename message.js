class Message {
   // Write code here!
   
      constructor(name, commands) {
          if (!name) {
              throw Error("Message name required."); //Test 4 ("throws error if a name is NOT passed into the constructor as the first parameter")
          }
          this.name = name; //Test 5 ("constructor sets name")
          this.commands = commands; //Test 6 ("contains a commands array passed into the constructor as the 2nd argument")
      }
  }

module.exports = Message;