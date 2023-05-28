var monthYearElement = document.getElementById('month-year');
var monthYearDisplayElement = document.getElementById('month-year-display');
var prevMonthBtn = document.getElementById('prev-month');
var nextMonthBtn = document.getElementById('next-month');

// Variáveis de controle do mês e ano atual
var currentMonth = (new Date()).getMonth();
var currentYear = (new Date()).getFullYear();

// Função para atualizar o calendário
function updateCalendar() {
    // Atualiza a descrição do mês e ano
    monthYearDisplayElement.textContent = getMonthName(currentMonth) + ' ' + currentYear;

    // Restante do código para gerar o calendário
    var calendarBody = document.getElementById('calendar-body');
    calendarBody.innerHTML = '';

    var startDate = new Date(currentYear, currentMonth, 1);
    var endDate = new Date(currentYear, currentMonth + 1, 0);
    var currentDay = startDate;

    // Obtém o número do dia da semana do primeiro dia do mês (0 - Dom, 1 - Seg, ..., 6 - Sáb)
    var startDayOfWeek = startDate.getDay();

    // Define o deslocamento necessário para começar a exibir os dias corretamente na primeira semana
    if (startDayOfWeek > 0) {
        var offset = 1 - startDayOfWeek;
        currentDay.setDate(offset);
    }

    var cellIdCounter = 1; // Variável para gerar IDs únicos para as células

    // Exibe os dias da semana
    var weekDaysRow = document.createElement('tr');
    var weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    for (var i = 0; i < weekDays.length; i++) {
        var weekDayCell = document.createElement('th');
        weekDayCell.textContent = weekDays[i];
        weekDaysRow.appendChild(weekDayCell);
    }
    calendarBody.appendChild(weekDaysRow);

    while (currentDay <= endDate) {
        var row = document.createElement('tr');
      
        for (var i = 0; i < 7; i++) {
          var cell = document.createElement('td');
      
          if (currentDay.getMonth() === currentMonth) {
            var topDiv = document.createElement('div');
            topDiv.classList.add('day-div');
            topDiv.textContent = currentDay.getDate();
      
            var bottomDiv = document.createElement('div');
            bottomDiv.classList.add('bottom-div');
      
            cell.appendChild(topDiv);
            cell.appendChild(bottomDiv);
      
            cell.classList.add('day-cell');
            cell.setAttribute('id', 'cell-' + cellIdCounter); // Define o ID único da célula para cada dia do mês
          } else {
            cell.classList.add('empty-cell');
          }
      
          row.appendChild(cell);
          cellIdCounter++; // Incrementa o contador de ID para a próxima célula
      
          currentDay.setDate(currentDay.getDate() + 1); // Movido para fora do bloco if/else
        }
      
        calendarBody.appendChild(row);
      }
}




// Função auxiliar para obter o nome do mês
function getMonthName(month) {
    var monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    return monthNames[month];
}

prevMonthBtn.addEventListener('click', function () {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    updateCalendar();
});

nextMonthBtn.addEventListener('click', function () {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    updateCalendar();
});

// Gera o calendário inicial
updateCalendar();