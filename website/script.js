const input = document.querySelector('input[type="text"]');
const select = document.getElementById('chatbot_type');
const messages = document.querySelector('.messages');


const entityData = {
    "book_a_room": {
      "Check in Date": "",
      "Check Out Date": "",
      "Nº Adults": "",
      "Nº Children": "",
      "Special Request": ""
    },
    "spa": {
      "Treatment": "",
      "Date": "",
      "Time": "",
      "Therapist": ""
    },
    "quote": {
      "Name": "",
      "Email": "",
      "Phone Number": "",
      "Service": "",
      "Additional Notes": ""
    }
  };
  
  document.addEventListener("DOMContentLoaded", function() {
      var chatbotTypeSelect = document.getElementById('chatbot_type');
      var headerTitle = document.querySelector('.header h1');
  
      chatbotTypeSelect.addEventListener('change', function() {
          var selectedOption2 = chatbotTypeSelect.value;
          var selectedOption = chatbotTypeSelect.options[chatbotTypeSelect.selectedIndex].text;
          headerTitle.textContent = 'Flow Example: ' + selectedOption;
          // Limpa as mensagens quando um novo tipo de chatbot for selecionado
          messages.innerHTML = '';
  
          // Carrega as entidades correspondentes ao tipo de chatbot selecionado
          loadEntities(selectedOption2);
      });
  });
  
  // Função para carregar as entidades correspondentes ao tipo de chatbot selecionado
  function loadEntities(chatbotType) {
      const entities = entityData[chatbotType];
      updateEntitiesTable(entities);
  }
  
  // Função para atualizar as linhas da tabela com as entidades
  function updateEntitiesTable(entities) {
    const tableBody = document.querySelector('.entities-table tbody');
    
    // Limpa todas as linhas existentes na tabela
    tableBody.innerHTML = '';

    // Adiciona novas linhas para cada entidade do tipo de chatbot selecionado
    for (const [entityName, entityValue] of Object.entries(entities)) {
        const newRow = document.createElement('tr');
        const nameCell = document.createElement('td');
        const valueCell = document.createElement('td');
        
        nameCell.textContent = entityName;
        valueCell.textContent = entityValue;

        newRow.appendChild(nameCell);
        newRow.appendChild(valueCell);

        tableBody.appendChild(newRow);
    }
}
document.getElementById('restartButton').addEventListener('click', function() {
    // Limpa o conteúdo da área de mensagens
    document.querySelector('.messages').innerHTML = '';
});


function updateEntitiesTable2(entities) {
    const tableRows = document.querySelectorAll('.entities-table tbody tr');
    tableRows.forEach(row => {
        const entityName = row.querySelector('td:first-child').textContent.trim();
        if (entities.hasOwnProperty(entityName)) {
            row.querySelector('td:last-child').textContent = entities[entityName];
        }
    });
}

function addMessage(text, sender) {
    const message = document.createElement('div');
    message.textContent = text;
    message.classList.add('message');

    const messageIcon = document.createElement('div');
    messageIcon.classList.add('message-icon');
    const icon = document.createElement('i');

    if (sender === 'user') {
        message.classList.add('user-message');
        message.appendChild(messageIcon); // Adiciona o ícone depois do texto para mensagens do usuário
        icon.classList.add('fas', 'fa-user'); // Ícone humano para mensagens do usuário
    } else {
        message.classList.add('bot-message');
        icon.classList.add('fas', 'fa-robot'); // Ícone de robô para mensagens do bot
        message.appendChild(messageIcon); // Adiciona o ícone antes do texto para mensagens do bot
    }

    messageIcon.appendChild(icon); // Adiciona o ícone dentro do elemento messageIcon

    messages.appendChild(message);
    messages.scrollTo({
        top: messages.scrollHeight,
        behavior: 'smooth'
    });
}

function getBotResponse(userMessage) {
    console.log(`Mensagem do usuário: ${userMessage}, Tipo de chatbot: ${select.value}`);
    fetch('http://127.0.0.1:8000/flow', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage, type: select.value }), // incluir o tipo de chatbot no corpo da solicitação
    })
    .then(response => response.json())
    .then(data => {
        addMessage(`${data.reply}`, 'bot');
        if (data.hasOwnProperty('entities')) {
            updateEntitiesTable2(data.entities);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const userMessage = input.value;
        addMessage(`${userMessage}`, 'user');
        getBotResponse(userMessage); // Chama a função que obtém a resposta do chatbot, agora passando o tipo de chatbot selecionado
        input.value = '';
    }
});
const sendButton = document.getElementById('sendButton');

sendButton.addEventListener('click', () => {
    const userMessage = input.value;
    addMessage(`Você: ${userMessage}`, 'user');
    getBotResponse(userMessage);
    input.value = '';
});