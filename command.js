class Command {
   constructor(commandType, value) {
     this.commandType = commandType; //Test 2 ("constructor sets command type")
     if (!commandType) {
       throw Error("Command type required."); //Test 1 ("throws error if command type is NOT passed into constructor as the first parameter")
     }
     this.value = value; //Test 3 ("constructor sets a value passed in as the 2nd argument")
   }
 }
 
 module.exports = Command;