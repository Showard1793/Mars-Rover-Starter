class Rover {
   // Write code here!
   constructor(position) {
      this.position = position;      //Test 7 ("constructor sets position and default values for mode and generatorWatts")
      this.mode = "NORMAL";         
      this.generatorWatts = 110;    
    }
  
    receiveMessage(message) {
      let response = {
        message: message.name,      //Test 8 ("response returned by receiveMessage contains the name of the message")
        results: []                 
      };
  
      for (let command of message.commands) {
        if (command.commandType === 'STATUS_CHECK') {         //Test 10 ("responds correctly to the status check command")
          response.results.push({                       
            completed: true,
            roverStatus: {
              mode: this.mode,
              generatorWatts: this.generatorWatts,
              position: this.position                         
            }
          });
        } else if (command.commandType === 'MODE_CHANGE') {      //Test 11("responds correctly to the mode change command")
          this.mode = command.value;
          response.results.push({ completed: true });
        } else if (command.commandType === 'MOVE') {             //Test 12("responds with a false completed value when attempting to move in LOW_POWER mode")
          if (this.mode === 'LOW_POWER') {
            response.results.push({ completed: false });
        } else {
            this.position = command.value;                       //13 ("responds with the position for the move command")
            response.results.push({ completed: true });
          }
        } else {
          response.results.push({ completed: false });
        }
      }
      return response;                //Test 9 ("response returned by receiveMessage includes two results if two commands are sent in the message")
    }
}

module.exports = Rover;