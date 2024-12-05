
// Variáveis ​​globais
let selectedFilm = ''; // Variável para armazenar o filme selecionado
const reservas = []; // Lista de reservas

// Função para abrir o seletor de filmes
function openFilmSelector() {
    const modal = document.getElementById('filmSelectorModal');
    modal.classList.remove('hidden');
}

// Função para fechar o seletor de filmes
function closeFilmSelector() {
    const modal = document.getElementById('filmSelectorModal');
    modal.classList.add('hidden');
}

// Função para selecionar um filme
function selectFilm(filmName) {
    selectedFilm = filmName;
    closeFilmSelector();
}

// Função para enviar o formulário e registrar uma reserva
document.getElementById('formReserva').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio tradicional do formulário
    
    const nome = document.getElementById('nome').value;
    const chave = document.getElementById('chave').value;
    const horario = document.getElementById('horario').value;
    const fotoInput = document.getElementById('novaFoto');
    const foto = fotoInput.files.length > 0 ? fotoInput.files[0] : null;

    // Verifica se o filme foi selecionado
    if (!selectedFilm) {
        alert('Por favor, escolha um filme!');
        return;
    }

    const reserva = { nome, chave, filme: selectedFilm, horario, foto };
    reservas.push(reserva); // Adiciona a reserva à lista

    updateReservas(); // Atualiza a exibição das reservas

    document.getElementById('formReserva').reset(); // Limpa os campos do formulário
    selectedFilm = ''; // Redefinir o filme selecionado
});

// Função para atualizar a lista de reservas
function updateReservas() {
    const reservasContainer = document.getElementById('reservas');
    reservasContainer.innerHTML = ''; // Limpa a lista atual de reservas

    reservas.forEach((reserva, index) => {
        const reservaDiv = document.createElement('div');
        reservaDiv.classList.add('reserva');
        
        let fotoHtml = '';
        if (reserva.foto) {
            const fotoURL = URL.createObjectURL(reserva.foto);
            fotoHtml = `<img src="${fotoURL}" alt="Foto de perfil" class="foto-perfil">`;
        } else {
            fotoHtml = `<span class="no-foto">Sem foto</span>`;
        }
        
        // Adicionando as informações da reserva
        reservaDiv.innerHTML = `
            <p><strong>Nome:</strong> ${reserva.nome}</p>
            <p><strong>Chave:</strong> ${reserva.chave}</p>
            <p><strong>Filme:</strong> ${reserva.filme}</p>
            <p><strong>Horário:</strong> ${reserva.horario}</p>
            ${fotoHtml}
            <button onclick="editReserva(${index})">Editar</button>
            <button onclick="deleteReserva(${index})">Deletar</button>
        `;
        reservasContainer.appendChild(reservaDiv);
    });
}

// Função para editar uma reserva
function editReserva(index) {
    const reserva = reservas[index];

    // Preenche o formulário com os dados da reserva para edição
    document.getElementById('nome').value = reserva.nome;
    document.getElementById('chave').value = reserva.chave;
    document.getElementById('horario').value = reserva.horario;
    selectedFilm = reserva.filme;
    // Aqui você pode adicionar um campo de foto, se necessário

    // Deleta a reserva original
    reservas.splice(index, 1);
    updateReservas(); // Atualiza a lista após remoção
}

// Função para deletar uma reserva
function deleteReserva(index) {
    // Remove a reserva da lista
    reservas.splice(index, 1);
    updateReservas(); // Atualiza a lista
}
