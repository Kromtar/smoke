import io from 'socket.io-client';

//const socket = io('https://smokeserver.herokuapp.com/');
const socket = io('https://quiet-journey-37928.herokuapp.com/');

socket.connect();

export default socket;
