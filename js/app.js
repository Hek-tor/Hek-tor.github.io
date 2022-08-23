const textArea = document.querySelector('#TxtInput');
const btnEncriptar = document.querySelector('.btn-Encriptador');
const btnDesencriptar = document.querySelector('.btn-desencriptador');
const imgContainer = document.querySelector('.img');
const areaResultado = document.querySelector('.resultado');
const mensajeUsuario = document.querySelector('.mensaje');

textArea.addEventListener('input', function () {
    if (textArea.value === '') {
        imgContainer.classList.remove('procesando');
        imgContainer.classList.add('img');
        mensajeUsuario.innerHTML = `<h3>${'Ningún mensaje fue encontrado'}</h3>`;
        areaResultado.innerHTML = `<p>${'Ingresa el texto que desees encriptar o desencriptar.'}</p>`;
    } else {
        imgContainer.classList.add('procesando');
        mensajeUsuario.innerHTML = ``;
        areaResultado.innerHTML = `<p>${'Encriptando...'}</p>`;
    }
});

btnEncriptar.addEventListener('click', () => {

    imgContainer.classList.remove('procesando');

    let txtEncriptado = textArea.value;
    txtEncriptado = removerAcentos(txtEncriptado);
    let respuesta = validador(txtEncriptado);

    if (respuesta === true) {
        btnEncriptar.classList.remove('btn-Activo');
        btnDesencriptar.classList.remove('btn-Off');

        btnEncriptar.classList.add('btn-Off');
        btnDesencriptar.classList.add('btn-Activo');

        let codigoSecreto = generador(txtEncriptado);
        mostarCodigo(codigoSecreto);
    };

    if (respuesta === false) {
        Swal.fire({
            imageUrl: 'https://media1.giphy.com/media/l0IxYWDltdHEqujnO/giphy.gif?cid=ecf05e47dnu4js176yr4zvpziy0lckqxvh9s5kic06q7x67t&rid=giphy.gif&ct=g',
            imageHeight: 300,
            imageAlt: 'Error Image',
            icon: 'error',
            title: 'Oops...',
            text: 'Recuerda que no debes usar mayúsculas,acentos ni números!'
        });
        imgContainer.classList.add('img');
        areaResultado.innerHTML = `<p>${'Intenta de nuevo escribiendo una oración válida'}</p>`;
    };
});
btnDesencriptar.addEventListener('click', function () {

    let Encriptado = areaResultado.textContent;

    if (Encriptado == 'Ingresa el texto que desees encriptar o desencriptar.' || Encriptado == 'Encriptando...') {
        Swal.fire({
            imageUrl: 'https://media1.giphy.com/media/26n6WywJyh39n1pBu/giphy.gif?cid=ecf05e479foiuk5uguu6a01kr4oknhu0xgzgrud52y1cttgy&rid=giphy.gif&ct=g',
            imageHeight: 300,
            imageAlt: 'Info not found',
            icon: 'info',
            title: 'Eh eh eh...',
            text: 'Nada que desencriptar por aquí, usa primero el botón encriptar!'
        });
    } else {
        btnDesencriptar.classList.remove('btn-Activo');
        btnEncriptar.classList.remove('btn-Off');

        btnDesencriptar.classList.add('btn-Off');
        btnEncriptar.classList.add('btn-Activo');

        let codigoLiberado = revertir(Encriptado);
        mostrarLiberado(codigoLiberado);
    };
});


function validador(txtEncriptado) {
    let err = true;
    for (let i = 0; i < txtEncriptado.length; i++) {
        if (txtEncriptado[i] !== ' ') {
            if (txtEncriptado[i] == txtEncriptado[i].toUpperCase()) {
                err = false
            };
        };
    };
    if (txtEncriptado.length === 0) {
        Swal.fire({
            imageUrl: 'https://media2.giphy.com/media/NS7gPxeumewkWDOIxi/giphy.gif?cid=ecf05e473qui5bjcfk58z9h925hk8ke4q0nhr4n4qrded4ma&rid=giphy.gif&ct=g',
            imageHeight: 300,
            imageAlt: 'Info not found',
            icon: 'info',
            title: 'Ey...',
            text: 'No encontramos ningún texto para encriptar!'
        });
        return;
    };
    return err;
};

function removerAcentos(string) {
    return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

function mostarCodigo(codigoSecreto) {
    imgContainer.classList.remove('img');
    mensajeUsuario.innerHTML = `<h3>${'El código encriptado es:'}</h3>`;
    areaResultado.innerHTML = `<p>${codigoSecreto}</p>`;

};

function mostrarLiberado(codigoLiberado) {
    mensajeUsuario.innerHTML = `<h3>${'El código desencriptado es: '}</h3>`;
    areaResultado.innerHTML = `<p>${codigoLiberado}</p>`;
};

function generador(texto) {

    let palabraCifrada = '';

    for (let i = 0; i < texto.length; i++) {
        let letra = texto[i]

        switch (letra) {
            case 'a':
                palabraCifrada += 'ai';
                break;
            case 'e':
                palabraCifrada += 'enter';
                break;
            case 'i':
                palabraCifrada += 'imes';
                break;
            case 'o':
                palabraCifrada += 'ober';
                break;
            case 'u':
                palabraCifrada += 'ufat';
                break;
            default:
                palabraCifrada += texto[i];
        };
    };
    return palabraCifrada;
};

function revertir(Encriptado) {
    let revertirCodigo = [['a', 'ai'], ['e', 'enter'], ['i', 'imes'], ['o', 'ober'], ['u', 'ufat']];

    for (let i = 0; i < revertirCodigo.length; i++) {
        if (Encriptado.includes(revertirCodigo[i][1])) {
            Encriptado = Encriptado.replaceAll(revertirCodigo[i][1], revertirCodigo[i][0]);
        };
    };
    return Encriptado
};
