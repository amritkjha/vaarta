const socket = io('http://localhost:8000');


const form = document.getElementById('sendContainer');
const messageInput = document.getElementById('msgInput');
const messageContainer = document.querySelector('.container');

var incomingMessage = new Audio('message-tone.mp3');

var notification = new Audio('msg.mp3');

const append = (message, position) =>{
	const messageElement = document.createElement('div');
	messageElement.innerText = message;
	messageElement.classList.add('message');
	messageElement.classList.add(position);
	messageContainer.append(messageElement);
	 if(position == 'left')
	 	incomingMessage.play();
	 if(position == 'center')
	 	notification.play();
}

form.addEventListener('submit', (e) =>{
	e.preventDefault();
	const message = messageInput.value;
	append(`You: ${message}`, 'right');
	socket.emit('send', message);
	messageInput.value = '';
})

const name = prompt('Enter name: ');

socket.emit('new-user-joined', name);

socket.on('user-joined', name =>{
	append(`${name} joined the chat`, 'center');
	addLineChange('abcd');
})

socket.on('receive', data =>{
	append(`${data.name}: ${data.message}`, 'left');
})

socket.on('leave', name =>{
	append(`${name} left the chat`, 'center');
})