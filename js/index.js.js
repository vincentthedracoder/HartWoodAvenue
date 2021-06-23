
// https://www.youtube.com/watch?v=YeFzkC2awTM JavaScript Shopping Cart Tutorial for Beginners↓↓
// for things to wait for page is already loaded like buttons. 
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

function ready() {
  const removeCartItemButtons = document.getElementsByClassName('btn-danger');
  for (let i = 0; i < removeCartItemButtons.length; i++) {
    let button = removeCartItemButtons[i];
      button.addEventListener('click', removeCartItem);
  };
    const quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for (let i = 0; i < quantityInputs.length; i++) {
      let input = quantityInputs[i];
      input.addEventListener('change', quantityChanged);
  }
  const addToCartButtons = document.getElementsByClassName('shop-item-button');
    for (let i = 0; i < addToCartButtons.length; i++) {
      let button =  addToCartButtons[i];
      button.addEventListener('click', addToCartClicked);
    }
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);
};

function upDateCartTotal() {
  const cartItemContainer = document.getElementsByClassName('cart-items')[0];//getElementsbyclassname
  //retuns a array of items so doing  [0] selects first item on array.
  const cartRows = cartItemContainer.getElementsByClassName('cart-row');
  let total = 0;
  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    const priceElement = cartRow.getElementsByClassName('cart-price')[0];
    const quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
    let price = parseFloat(priceElement.innerText.replace('$', ''));// parseFloat() makes any string
    //into a float and the .replace('$', '') takes the $ and turns removes it with the empty ''
    let quantity = quantityElement.value;
    total = total +(price * quantity);
  };
  total = Math.round(total * 100) / 100; //makes the decible be only 2 like 1.23 instead of 1.2345678 it times it by 100 then divides by 100
  document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total; //.innerText gets the text within the content
};



function removeCartItem(event) {
  let buttonclicked = event.target
  buttonclicked.parentElement.parentElement.remove();
  upDateCartTotal();
};


function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1
  }
  upDateCartTotal();
};

function addToCartClicked(event) {
  let button = event.target
  let shopItem = button.parentElement;
  let title = shopItem.getElementsByClassName('Shop-item-title')[0].innerText;
  let imageAndPrice = button.parentElement.parentElement;
  let price = imageAndPrice.getElementsByClassName('item-price')[0].innerText;
  let imageSrc = imageAndPrice.getElementsByClassName('img-fluid')[0].src;
  console.log(title, price, imageSrc);
  addItemToCart(title, price, imageSrc);
  upDateCartTotal()
};

function addItemToCart(title, price, imageSrc) {
  let cartRow = document.createElement('div');
  cartRow.classList.add('cart-row')      // adds class of cart-row for styling 
  let cartItems = document.getElementsByClassName('cart-items')[0];
  let cartItemNames = cartItems.getElementsByClassName('cart-item-title')
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText === title) {
      alert('This item is already added to the cart')
      return
    }
  };
// backticks allows strings to be used on multiple lines also allows variables to be used with in the ${}
  let cartRowContents = ` 
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
     </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
    </div>`;
    cartRow.innerHTML = cartRowContents;  // innterHTML uses the Html above^
  cartItems.append(cartRow)
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
};

function purchaseClicked() {
  alert('Thank you for your purchase')
  let cartItems = document.getElementsByClassName('cart-items')[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild)
  }
  upDateCartTotal()
};



//↑↑↑↑





























































































// forget what this does ↓↓↓↓
function readURL(input) {

  if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
          $('#blah').attr('src', e.target.result);
      }

      reader.readAsDataURL(input.files[0]);
  }
}//↑↑↑↑











// function to call to get individual socket ↓↓↓↓
// import io from 'socket.io-client'
// //↑↑↑↑

// const io = require('socket.io')(3000, {
//   cors: {
//     origin: ['https://hartwoodserver2.herokuapp.com/'],
//   },
// })








// //connects to socket.io server↓↓↓

// let socket;
// socket = io.connect('https://hartwoodserver2.herokuapp.com/', 'https://admin.socket.io');
// //↑↑↑↑
// // connects the id="id" tags from html to use here ↓↓↓
// let imagehere =  document.getElementById('imagehere');
// let input = document.getElementById("inp");
// //↑↑↑2♦↑
// let myFile

// // file reader script to make the tobase64toBase64(myFile).then((res) => { function ↓↓↓↓↓
//   const toBase64 = file => new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result)
//     reader.onerror = error => reject(error)
//   });
// //↑↑↑↑↑↑↑
//     input.onchange = function (e) {
//       myFile = this.files[0]
//       if (myFile) {
//         //function to create the image to base64 ↓↓↓
//         toBase64(myFile).then((res) => {
//         //↑↑↑↑
//             //button with id of sendimage activates function to emit the "res" variable thats
//             // that holds the base64 of the image
//             //socket.emit()'imagesent', { creates a object and sends it to the server
//             //image sent is the referance that will be used to receive what was sent back
//             // hello is the object property and res would be the value.↓↓↓↓
//             sendimage.addEventListener('click', function(){
//               socket.emit('imagesent', {
//                 hello: res
//                 //↑↑↑↑
//              }, message => { 
//                displaymessage(message)
//               });
//           })
          
//       })
//     }
//     }
//     // socket.on listens to socket.io server for the imagesent we sent from socket.emit
//     //image.innerHTML = pushes what is = too to the div with imagehere id
//     //data.hello inputs the value of hello that we received ↓↓↓↓
//     socket.on('imagesent', function(data){
//       console.log(data);
//       imagehere.innerHTML = '<img src="'+ data.hello +'" alt="image sent to server" width="500" height="600">';
//     });
//     //↑↑↑↑↑
    
// function displaymessage(message) {
//             const messageFromServer = document.getElementById('messagefromserver');
//             messageFromServer.textContent = message
//             document.getElementById ('fromserverhere').append(messageFromServer)
//           }




















































// ("#imgInp").change(function(){
//   readURL(this);
// });

// $(document).ready(function() {
 
//   $(document).on("click",function(e){
//      var screenWidth = window.innerWidth;
//      if (screenWidth < 768) {
//        $("#navbarSupportedContent").collapse('hide');
//      }
//   });
 
//  });







// socket = io(ENDPOINT);

// setRoom(room);
// setName(name)

// socket.emit('join', { name, room }, (error) => {
//   if(error) {
//     alert(error);
//   }
// });
// }, [ENDPOINT, location.search]);









// function previewFile() {
// const file = document.querySelector('inp[type=file]').files[0];



// }



// var b64 = btoa(my)
//  var unicode = atob(b64)
//  console.log(b64); 
//  console.log(unicode);







// function readFile() {
//   if (this.files && this.files[0]) {
//     var FR= new FileReader();
//     FR.addEventListener("load", function(e) {
//       document.getElementById("img").src       = e.target.result;
//       window.hello = document.getElementById("b64").innerHTML = e.target.result;


//     }); 
    
//     FR.readAsDataURL( this.files[0] );
   
//   }
// }
      
// document.getElementById("inp").addEventListener("change", readFile);



//     sendimage =  document.getElementById('sendimage');

  

    // let sendimage = document.getElementById('sendimage')

// input.onchange = function (e) {
//   let f = this.files[0]































































    
    
    
    
    
      //   myButton.onclick = function (e) {
    
      // }
    
    
    
    // if(sendimage){
    //   sendimage.addEventListener('click', function(){
    //     socket.emit('imagesent', {
    //       hello: myFile
       
     
    //    });   console.log(b64Image);
    //   });
    // }
    
    
    
    
    
    
    
    // if(sendimage){
      //   sendimage.addEventListener('click', function(){
        //     const file = document.querySelector('input[type=file]').files[0];
        // window.btoa(encodeURIComponent(file));
        
        
        //     socket.emit('imagesent', {
          //       hello: file
          
          
          //    });   console.log(file);
          //   });
          // }
          // socket.on('imagesent', function(data){
            //   imagehere.innerHTML = '<img src="'+ data.hello +'" alt="image sent to server" width="500" height="600">';
            //   console.log(data);
// });


//  inp = document.getElementById('inp');

// inp.addEventListener('change', function(){
//   const file = document.querySelector('input[type=file]').files[0];
//   console.log(file)
//    var me = window.btoa(file);
//   console.log(me);
//   var decode = window.atob(me)
//   console.log(decode);
// });






//copy of code that worked to add a image from a file to socket.io server back to the html page. goes away on refresh of course //code reads then outputs the image as a base64 then made the window.hello global and used it to send to the server

// function readFile() {
//   if (this.files && this.files[0]) {
//     var FR= new FileReader();
//     FR.addEventListener("load", function(e) {
//       document.getElementById("img").src       = e.target.result;
//       window.hello = document.getElementById("b64").innerHTML = e.target.result;
//     }); 
    
//     FR.readAsDataURL( this.files[0] );
//     console.log(inp.value); 
//   }
// }
      
// document.getElementById("inp").addEventListener("change", readFile);


// var socket;

// socket = io.connect('https://hartwoodserver2.herokuapp.com/');

// var imagehere =  document.getElementById('imagehere');
//     sendimage =  document.getElementById('sendimage');

  
// if(sendimage){
//   sendimage.addEventListener('click', function(){
//     socket.emit('imagesent', {
//       hello: hello
 
//    });
//   });
// }
// socket.on('imagesent', function(data){
//   imagehere.innerHTML = '<img src="'+ data.hello +'" alt="image sent to server" width="500" height="600">';
// });


















//copy of code that worked to add a image from a file to socket.io server back to the html page. goes away on refresh of course //code reads then outputs the image as a base64 then made the window.hello global and used it to send to the server

// function readFile() {
//   if (this.files && this.files[0]) {
//     var FR= new FileReader();
//     FR.addEventListener("load", function(e) {
//       document.getElementById("img").src       = e.target.result;
//       window.hello = document.getElementById("b64").innerHTML = e.target.result;
//     }); 
    
//     FR.readAsDataURL( this.files[0] );
//     console.log(inp.value); 
//   }
// }
      
// document.getElementById("inp").addEventListener("change", readFile);


// var socket;

// socket = io.connect('https://hartwoodserver2.herokuapp.com/');

// var imagehere =  document.getElementById('imagehere');
//     sendimage =  document.getElementById('sendimage');

  
// if(sendimage){
//   sendimage.addEventListener('click', function(){
//     socket.emit('imagesent', {
//       hello: hello
 
//    });
//   });
// }
// socket.on('imagesent', function(data){
//   imagehere.innerHTML = '<img src="'+ data.hello +'" alt="image sent to server" width="500" height="600">';
// });







































 

// Emit events
// btn.addEventListener('click', function(){
//     socket.emit('chat', {
//         message: message.value,
//         handle: handle.value
//     });
//     message.value = "";
//   });

// message.addEventListener('keypress', function(){
//     socket.emit('typing', handle.value);
// });


//returns from server






//     const base64 = btoa(uploadfile.value);
//   //   const decode = //atob(base64)
//   // console.log("Decoded: " + decode);
//   console.log("Base64: " + base64);
//       if(sendimage){
//         sendimage.addEventListener('click', function(){
//           console.log(base64.value)
//           console.log("Base64: " + base64);
//           console.log(uploadfile.value);



//   socket.emit('imagesent', {
//     base64: base64.value,
//   });
//   console.log("Base64: " + base64);
//   base64.value = "";
// });
//       }


// socket.on('imagesent', function(data){
//   imagehere.innerHTML = '<img src="'+ data.uploadfile +'" alt="image sent to server" width="500" height="600">';
// });










// Emit events
// btn.addEventListener('click', function(){
//     socket.emit('chat', {
//         message: message.value,
//         handle: handle.value
//     });
//     message.value = "";
//   });

// message.addEventListener('keypress', function(){
//     socket.emit('typing', handle.value);
// });


//returns from server








// // Listen for events
// socket.on('chat', function(data){
//     feedback.innerHTML = ''
//     output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
// });

// socket.on('typing', function(data){
//     feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
// });





















// // socket.io from chat app
// import React, { useState, useEffect } from "react";
// import queryString from 'query-string';
// import io from "socket.io-client";

// import TextContainer from '../TextContainer/TextContainer';
// import Messages from '../Messages/Messages';
// import InfoBar from '../InfoBar/InfoBar';
// import Input from '../Input/Input';

// import './Chat.css';

// const ENDPOINT = 'https://hartwoodavenueserver.herokuapp.com/';






// // from learned socket.io chat.js
// // Query DOM
// var message = document.getElementById('message'),
//       handle = document.getElementById('handle'),
//       btn = document.getElementById('send'),
//       output = document.getElementById('output'),
//       feedback = document.getElementById('feedback');
//       imagehere =  document.getElementById('imagehere');
//       avatar =  document.getElementById('avatar');
//       sendimage =  document.getElementById('sendimage');

// // Emit events
// btn.addEventListener('click', function(){
//     socket.emit('chat', {
//         message: message.value,
//         handle: handle.value
//     });
//     message.value = "";
//   });

//   sendimage.addEventListener('click', function(){
//     socket.emit('imagesent', {
//         avatar: avatar.value,
//     });
//     avatar.value = "";
//   });


// message.addEventListener('keypress', function(){
//     socket.emit('typing', handle.value);
// });



// // Listen for events
// socket.on('chat', function(data){
//     feedback.innerHTML = ''
//     output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
// });

// socket.on('typing', function(data){
//     feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
// });

// socket.on('imagesent', function(data){
//   feedback.innerHTML = '<img src="'+ data.avatar +'" alt="image sent to server" width="500" height="600">';
// });






















// let socket;

// const Chat = ({ location }) => {
//   const [name, setName] = useState('');
//   const [room, setRoom] = useState('');
//   const [users, setUsers] = useState('');
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     const { name, room } = queryString.parse(location.search);

//     socket = io(ENDPOINT);

//     setRoom(room);
//     setName(name)

//     socket.emit('join', { name, room }, (error) => {
//       if(error) {
//         alert(error);
//       }
//     });
//   }, [ENDPOINT, location.search]);
  
//   useEffect(() => {
//     socket.on('message', message => {
//       setMessages(messages => [ ...messages, message ]);
//     });
    
//     socket.on("roomData", ({ users }) => {
//       setUsers(users);
//     });
// }, []);

//   const sendMessage = (event) => {
//     event.preventDefault();

//     if(message) {
//       socket.emit('sendMessage', message, () => setMessage(''));
//     }
//   }

//   return (
//     <div className="outerContainer">
//       <div className="container">
//           <InfoBar room={room} />
//           <Messages messages={messages} name={name} />
//           <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
//       </div>
//       <TextContainer users={users}/>
//     </div>
//   );
// }

// export default Chat;


// // end off chat app copy
  
