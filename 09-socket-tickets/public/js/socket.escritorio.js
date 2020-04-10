var socket = io();

var searchParms = new URLSearchParams(window.location.search);
var label = $('small');

if (!searchParms.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParms.get('escritorio');

$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
        console.log(resp);
        if (resp.numero) {
            $('small').text(resp.numero);
        } else {
            $('small').text(resp.numero);
        }
    });
});