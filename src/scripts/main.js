$(document).ready(function(){
    $('#telefone').mask('(00) 00000-0000')

    $('form').validate({
        rules: {
            nome: {
                required: true,
            },
            email: {
                required: true,
                email: true
            },
            telefone: {
                required: false,
            },
            mensagem: {
                required: true,
            }
        },
        messages: {
            nome: 'Por favor, insira o seu nome',
            email: 'Por favor, insira o seu e-mail',
            mensagem: 'Por favor, insira o seu nome'
        },
        subimitHandler: function(form) {
            console.log(form)
        },
        invalidHandler: function(evento, validador) {
            let camposIncorretos = validador.numberOfInvalids();
            if (camposIncorretos == 1) {
                alert(`Existem ${camposIncorretos} campo incorreto`)
            } else {
                alert(`Existem ${camposIncorretos} campos incorretos`)
            }
        },
    })

    $('#bandeira-da-revolução  button, #perseguicao button, #turbulencia button, #batalha-decisiva button').click(function(){
        const destino = $('#historia');

        $('html').animate({
            scrollTop: destino.offset().top
        },1000)
    })
})