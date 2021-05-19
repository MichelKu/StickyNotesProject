// Create an array to store messages in
let messages = [];

// Check if there are store messages in localStorage
// and then read them from localStorage to messages
try {
  messages = JSON.parse(localStorage.messages);
} catch (e) {}

// Add initial html
// An add button and a holder for messages
$("body").append(/*html*/ `
  <h2>Sticky notes board</h2>
  <button class="add-message">Type note</button>
  <button class="remove-all-messages">Remove all notes</button>
  <div class="messages"></div>
  <form class="message-form">
    <button class="remove-form">x</button>
    <label>
      Background color:
      <input type="color" name="bgColor" value="#f7e756">
    </label>
    <label>
      Text color:
      <input type="color" name="textColor" value="black">
    </label>
    <input type="text" name="message" placeholder="Write your message...">
    <input type="submit" value="Add note">
  </form>
`);

// Render the messages (so that we see messages already in localStorage)
renderMessages();

// Add an event handler fro the add-message button
$(".add-message").click(function () {
  // Show the message form
  $(".message-form").fadeIn(500);
  $(".messages").css("margin-top", "250px");
});

$(".remove-all-messages").click(function () {
  $(".messages").hide();
});

// Hide the message form if you click outside it
// document = built in JS object = the whole viewport
$(document).click(function (event) {
  // The closest element to the click
  // is event.target

  let clickedElement = event.target;
  if (
    $(".message-form").find(clickedElement).length === 0 &&
    !$(clickedElement).hasClass("add-message") &&
    !$(clickedElement).hasClass("message-form")
  ) {
    // You have clicked outside the message form
    $(".message-form").hide();
  }
});

// Add an event handler for the submit button
// in the message form
$(".message-form").submit(function (event) {
  // Prevent the default browser behavior of reloading
  // the page when a form is submitted
  event.preventDefault();
  $(".messages").css("margin-top", "30px");
  // Read the text from the message field
  let message = $('input[name="message"]').val();
  // Read the bgColor and the textColor from the fields
  let bgColor = $('input[name="bgColor"]').val();
  let textColor = $('input[name="textColor"]').val();
  let m = margin();
  let r = rotate();

  // Add the message as an object to the messages arrays
  // { message: text } means 'create a new object with the
  // property text and give it the value from the variable message
  messages.push({ text: message, bgColor, textColor, m, r });
  // store messages in localStorage
  localStorage.messages = JSON.stringify(messages);
  // render the messages to the DOM

  renderMessages();
  // hide the form
  $(".message-form").hide();
  // empty the message field
  $('input[name="message"]').val("");
});

// Add a delegated event handler for remove buttons
$("body").on("click", ".remove-message", function () {
  // Find the index of the message to remove
  let indexToRemove = $(".message").index($(this).parent());
  // Remove the message from the messages array
  messages.splice(indexToRemove, 1);
  // Save to localStorage
  localStorage.messages = JSON.stringify(messages);
  // Update the display be calling renderMessages
  renderMessages();
});

// Render the messages to the DOM
function renderMessages() {
  // Empty the messages div
  $(".messages").empty();
  // Loop through all messages
  for (let message of messages) {
    $(".messages").append(/*html*/ `
      <div class="message" style="color:${message.textColor};background-color:${message.bgColor}; margin: ${message.m}; transform: ${message.r}">
        ${message.text}
        <button class="remove-message">x</button>
      </div>
    `);
  }
}

function margin() {
  let random_margin = ["5-px", "-1px", "5px", "10px", "15px", "20px"];

  return random_margin[Math.floor(Math.random() * random_margin.length)];
}

function rotate() {
  let random_rotate = [
    "rotate(3deg)",
    "rotate(1deg)",
    "rotate(-1deg)",
    "rotate(-3deg)",
    "rotate(-5deg)",
    "rotate(-10deg)",
  ];

  return random_rotate[Math.floor(Math.random() * random_rotate.length)];
}

$(".message").on("mouseenter", function () {
  $(this).css("transform", "scale(1.1)");
  console.log(this);
});

$(".message").on("mouseleave", function () {
  $(this).css("transform", "scale(1)");
  console.log(this);
});

$(".message").on("dblclick", function () {
  $(this).css("transform", "draggable()");
});

/*
TO-DO LIST:

Remove all notes knapp

Scale fungerar inte efter man lagt till en note
Message-form ska fade out

Pilla med finare knappar och design

Gör sticky notes dragable

Roterade stickys förlorar sitt rotations värde efter man hovrat över en note och skalat upp den

Lägg till timestamp på varje note
*/
