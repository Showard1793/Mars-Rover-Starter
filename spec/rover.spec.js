const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!

  //Test 7
  test("constructor sets position and default values for mode and generatorWatts", function() {
    let testRover = new Rover(1);
    expect(testRover.position).toBe(1);
    expect(testRover.mode).toBe('NORMAL');
    expect(testRover.generatorWatts).toBe(110);
  });

  //Test 8
  test("response returned by receiveMessage contains the name of the message", function() {
    let testCommands = [new Command('STATUS_CHECK')];
    let testMessage = new Message('Test message', testCommands);
    let testRover = new Rover(1);
    let testResponse = testRover.receiveMessage(testMessage);
    expect(testResponse.message).toBe('Test message');
  });

  //Test 9 
  test("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let testCommands = [new Command('STATUS_CHECK'), new Command('MODE_CHANGE', 'LOW_POWER')];
    let testMessage = new Message('Test message', testCommands);
    let testRover = new Rover(1);
    let testResponse = testRover.receiveMessage(testMessage);
    expect(testResponse.results.length).toBe(2);
  });

  //Test 10
  test("responds correctly to the status check command", function() {
    let TestCommands = [new Command('STATUS_CHECK')];
    let TestMessage = new Message('Test Message', TestCommands);
    let TestRover = new Rover(1);
    let TestResponse = TestRover.receiveMessage(TestMessage);
    expect(TestResponse.results[0].roverStatus).toEqual({
      mode: 'NORMAL',
      generatorWatts: 110,
      position: 1
    });
  });

  //Test 11
  test("responds correctly to the mode change command", function() {
    let testCommands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let testMessage = new Message('Test Message', testCommands);
    let testRover = new Rover(1);
    let testResponse = testRover.receiveMessage(testMessage);
    expect(testResponse.results[0].completed).toBe(true);
    expect(testRover.mode).toBe('LOW_POWER');
  });

  //Test 12
  test("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    let testCommands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 12345)];
    let testMessage = new Message('Move in low power mode message', testCommands);
    let testRover = new Rover(1);
    let testResponse = testRover.receiveMessage(testMessage);
    expect(testResponse.results[1].completed).toBe(false);
    expect(testRover.position).toBe(1);
  });

  //Test 13
  test("responds with the position for the move command", function() {
    let testCommands = [new Command('MOVE', 12345)];
    let testMessage = new Message('Move message', testCommands);
    let testRover = new Rover(1);
    let testResponse = testRover.receiveMessage(testMessage);
    expect(testResponse.results[0].completed).toBe(true);
    expect(testRover.position).toBe(12345);
  });
  
});
