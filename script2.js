const isDev = true;  // Altere para false para simular um usuário sem permissão


let ul =document.querySelector('nav .ul');

function openMenu(){
    ul.classList.add('open');

}

function closeMenu(){
    ul.classList.remove('open');
    
}


// Carrossel Infinito
const carousel = document.querySelector('.carousel');
const cards = document.querySelectorAll('.carousel .card');
const cardCount = cards.length;
let currentIndex = 0;

// Clona os cards para criar o efeito infinito
function setupInfiniteCarousel() {
    for (let i = 0; i < cardCount; i++) {
        const cloneStart = cards[i].cloneNode(true);
        const cloneEnd = cards[i].cloneNode(true);
        carousel.appendChild(cloneStart);
        carousel.insertBefore(cloneEnd, cards[0]);
    }
}

function updateCarousel() {
    const cardWidth = cards[0].offsetWidth + 20; // Largura do card + gap
    const offset = -(currentIndex + cardCount) * cardWidth + (carousel.parentElement.offsetWidth / 2 - cardWidth / 2);
    carousel.style.transition = 'transform 0.5s ease';
    carousel.style.transform = `translateX(${offset}px)`;

    // Atualiza o card ativo
    const allCards = document.querySelectorAll('.carousel .card');
    allCards.forEach((card, index) => {
        card.classList.remove('active');
        if (index === currentIndex + cardCount) {
            card.classList.add('active');
        }
    });

    // Reseta a posição sem transição para o loop infinito
    setTimeout(() => {
        if (currentIndex >= cardCount) {
            carousel.style.transition = 'none';
            currentIndex = 0;
            const resetOffset = -(currentIndex + cardCount) * cardWidth + (carousel.parentElement.offsetWidth / 2 - cardWidth / 2);
            carousel.style.transform = `translateX(${resetOffset}px)`;
        } else if (currentIndex < 0) {
            carousel.style.transition = 'none';
            currentIndex = cardCount - 1;
            const resetOffset = -(currentIndex + cardCount) * cardWidth + (carousel.parentElement.offsetWidth / 2 - cardWidth / 2);
            carousel.style.transform = `translateX(${resetOffset}px)`;
        }
    }, 500); // Tempo da transição
}

function moveCarousel(direction) {
    currentIndex += direction;
    updateCarousel();
}

// Inicializa o carrossel
setupInfiniteCarousel();
updateCarousel();

// Rotação automática a cada 3 segundos
setInterval(() => {
    moveCarousel(1);
}, 6000);

// Ajusta o carrossel ao redimensionar a janela
window.addEventListener('resize', updateCarousel);


const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  todayBtn = document.querySelector(".today-btn"),
  gotoBtn = document.querySelector(".goto-btn"),
  dateInput = document.querySelector(".date-input"),
  eventDay = document.querySelector(".event-day"),
  eventDate = document.querySelector(".event-date"),
  eventsContainer = document.querySelector(".events"),
  addEventBtn = document.querySelector(".add-event"),
  addEventWrapper = document.querySelector(".add-event-wrapper "),
  addEventCloseBtn = document.querySelector(".close "),
  addEventTitle = document.querySelector(".event-name "),
  addEventFrom = document.querySelector(".event-time-from "),
  addEventTo = document.querySelector(".event-time-to "),
  addEventSubmit = document.querySelector(".add-event-btn ");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

// const eventsArr = [
//   {
//     day: 13,
//     month: 11,
//     year: 2022,
//     events: [
//       {
//         title: "Event 1 lorem ipsun dolar sit genfa tersd dsad ",
//         time: "10:00 AM",
//       },
//       {
//         title: "Event 2",
//         time: "11:00 AM",
//       },
//     ],
//   },
// ];

const eventsArr = [];
getEvents();
console.log(eventsArr);

//function to add days in days with class day and prev-date next-date on previous month and next month days and active on today
function initCalendar() {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  date.innerHTML = months[month] + " " + year;

  let days = "";

  const fixedEvents = [
    {
        day: 30,
        month: 10,
        year: 2024,
        events: [
            { title: "Entrega de convites", time: "08:00" }
        ]
    },
    {
        day: 2,
        month: 11,
        year: 2024,
        events: [
            { title: "Divulgação do material de estudos", time: "08:00" }
        ]
    },
    {
        day: 11,
        month: 11,
        year: 2024,
        events: [
            { title: "Dia da Assembleia", time: "08:00" }
        ]
    },
    {
        day: 13,
        month: 11,
        year: 2024,
        events: [
            { title: "Premiações e certificados", time: "08:00" }
        ]
    }
];

const eventsArr = [];

// Função para obter eventos do localStorage e adicionar eventos fixos
function getEvents() {
    if (localStorage.getItem("events") !== null) {
        eventsArr.push(...JSON.parse(localStorage.getItem("events")));
    }
    // Adicionar eventos fixos
    fixedEvents.forEach(event => {
        eventsArr.push(event);
    });
}

// Inicializa o calendário
function initCalendar() {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    date.innerHTML = months[month] + " " + year;

    let days = "";

    // Adicionar dias do mês anterior
    for (let x = day; x > 0; x--) {
        days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
    }

    // Adicionar dias do mês atual
    for (let i = 1; i <= lastDate; i++) {
        // Verificar se há evento nesse dia
        let event = false;
        eventsArr.forEach(eventObj => {
            if (eventObj.day === i && eventObj.month === month + 1 && eventObj.year === year) {
                event = true;
            }
        });
        // Adicionar a classe "active" se for o dia atual
        if (i === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
            activeDay = i;
            days += `<div class="day today active ${event ? "event" : ""}">${i}</div>`;
        } else {
            days += `<div class="day ${event ? "event" : ""}">${i}</div>`;
        }
    }

    // Adicionar dias do mês seguinte
    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="day next-date">${j}</div>`;
    }
    daysContainer.innerHTML = days;
    addListner();
}

// Adicionar listener para dias do calendário
function addListner() {
    const days = document.querySelectorAll(".day");
    days.forEach(day => {
        day.addEventListener("click", (e) => {
            activeDay = Number(e.target.innerHTML);
            // Atualiza eventos para o dia ativo
            updateEvents(activeDay);
            days.forEach(day => {
                day.classList.remove("active");
            });
            e.target.classList.add("active");
        });
    });
}

// Atualizar eventos na tela
function updateEvents(date) {
    let events = "";
    eventsArr.forEach(event => {
        if (date === event.day && month + 1 === event.month && year === event.year) {
            event.events.forEach(event => {
                events += `<div class="event">
                    <div class="title">
                        <i class="fas fa-circle"></i>
                        <h3 class="event-title">${event.title}</h3>
                    </div>
                    <div class="event-time">
                        <span class="event-time">${event.time}</span>
                    </div>
                </div>`;
            });
        }
    });
    if (events === "") {
        events = `<div class="no-event">
            <h3>Sem Eventos</h3>
        </div>`;
    }
    eventsContainer.innerHTML = events;
}

// Carregar eventos
getEvents();
initCalendar(); // Inicializa o calendário

  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDate; i++) {
    //check if event is present on that day
    let event = false;
    eventsArr.forEach((eventObj) => {
      if (
        eventObj.day === i &&
        eventObj.month === month + 1 &&
        eventObj.year === year
      ) {
        event = true;
      }
    });
    if (
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      activeDay = i;
      getActiveDay(i);
      updateEvents(i);
      if (event) {
        days += `<div class="day today active event">${i}</div>`;
      } else {
        days += `<div class="day today active">${i}</div>`;
      }
    } else {
      if (event) {
        days += `<div class="day event">${i}</div>`;
      } else {
        days += `<div class="day ">${i}</div>`;
      }
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }
  daysContainer.innerHTML = days;
  addListner();
}

// Eventos fixos
const fixedEvents = [
    {
        day: 30,
        month: 10,
        year: 2024,
        events: [
            { title: "Entrega de convites", time: "08:00" }
        ]
    },
    {
        day: 2,
        month: 11,
        year: 2024,
        events: [
            { title: "Divulgação do material de estudos", time: "08:00" }
        ]
    },
    {
        day: 11,
        month: 11,
        year: 2024,
        events: [
            { title: "Dia da Assembleia", time: "08:00" }
        ]
    },
    {
        day: 13,
        month: 11,
        year: 2024,
        events: [
            { title: "Premiações e certificados", time: "08:00" }
        ]
    }
];

// Carregar eventos do localStorage se existirem
function getEvents() {
    if (localStorage.getItem("events") !== null) {
        eventsArr.push(...JSON.parse(localStorage.getItem("events")));
    }
    // Adicionar eventos fixos
    fixedEvents.forEach(event => {
        eventsArr.push(event);
    });
}

// Chama a função para obter eventos
getEvents();
console.log(eventsArr);

//function to add month and year on prev and next button
function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

initCalendar();

//function to add active on day
function addListner() {
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    day.addEventListener("click", (e) => {
      getActiveDay(e.target.innerHTML);
      updateEvents(Number(e.target.innerHTML));
      activeDay = Number(e.target.innerHTML);
      //remove active
      days.forEach((day) => {
        day.classList.remove("active");
      });
      //if clicked prev-date or next-date switch to that month
      if (e.target.classList.contains("prev-date")) {
        prevMonth();
        //add active to clicked day afte month is change
        setTimeout(() => {
          //add active where no prev-date or next-date
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("prev-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else if (e.target.classList.contains("next-date")) {
        nextMonth();
        //add active to clicked day afte month is changed
        setTimeout(() => {
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("next-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else {
        e.target.classList.add("active");
      }
    });
  });
}

todayBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
});

dateInput.addEventListener("input", (e) => {
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
  if (dateInput.value.length === 2) {
    dateInput.value += "/";
  }
  if (dateInput.value.length > 7) {
    dateInput.value = dateInput.value.slice(0, 7);
  }
  if (e.inputType === "deleteContentBackward") {
    if (dateInput.value.length === 3) {
      dateInput.value = dateInput.value.slice(0, 2);
    }
  }
});

gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
  console.log("here");
  const dateArr = dateInput.value.split("/");
  if (dateArr.length === 2) {
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      month = dateArr[0] - 1;
      year = dateArr[1];
      initCalendar();
      return;
    }
  }
  alert("Invalid Date");
}

//function get active day day name and date and update eventday eventdate
function getActiveDay(date) {
  const day = new Date(year, month, date);
  const dayName = day.toString().split(" ")[0];
  eventDay.innerHTML = dayName;
  eventDate.innerHTML = date + " " + months[month] + " " + year;
}

//function update events when a day is active
function updateEvents(date) {
  let events = "";
  eventsArr.forEach((event) => {
    if (
      date === event.day &&
      month + 1 === event.month &&
      year === event.year
    ) {
      event.events.forEach((event) => {
        events += `<div class="event">
            <div class="title">
              <i class="fas fa-circle"></i>
              <h3 class="event-title">${event.title}</h3>
            </div>
            <div class="event-time">
              <span class="event-time">${event.time}</span>
            </div>
        </div>`;
      });
    }
  });
  if (events === "") {
    events = `<div class="no-event">
            <h3>Sem Eventos</h3>
        </div>`;
  }
  eventsContainer.innerHTML = events;
  saveEvents();
}



//function to add event
addEventBtn.addEventListener("click", () => {
  addEventWrapper.classList.toggle("active");
});

addEventCloseBtn.addEventListener("click", () => {
  addEventWrapper.classList.remove("active");
});

document.addEventListener("click", (e) => {
  if (e.target !== addEventBtn && !addEventWrapper.contains(e.target)) {
    addEventWrapper.classList.remove("active");
  }
});

//allow 50 chars in eventtitle
addEventTitle.addEventListener("input", (e) => {
  addEventTitle.value = addEventTitle.value.slice(0, 60);
});

function defineProperty() {
  var osccred = document.createElement("div");
  document.body.appendChild(osccred);
}

defineProperty();

//allow only time in eventtime from and to
addEventFrom.addEventListener("input", (e) => {
  addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
  if (addEventFrom.value.length === 2) {
    addEventFrom.value += ":";
  }
  if (addEventFrom.value.length > 5) {
    addEventFrom.value = addEventFrom.value.slice(0, 5);
  }
});

addEventTo.addEventListener("input", (e) => {
  addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
  if (addEventTo.value.length === 2) {
    addEventTo.value += ":";
  }
  if (addEventTo.value.length > 5) {
    addEventTo.value = addEventTo.value.slice(0, 5);
  }
});

//function to add event to eventsArr
addEventSubmit.addEventListener("click", () => {
  const eventTitle = addEventTitle.value;
  const eventTimeFrom = addEventFrom.value;
  const eventTimeTo = addEventTo.value;
  if (eventTitle === "" || eventTimeFrom === "" || eventTimeTo === "") {
    alert("Please fill all the fields");
    return;
  }

  //check correct time format 24 hour
  const timeFromArr = eventTimeFrom.split(":");
  const timeToArr = eventTimeTo.split(":");
  if (
    timeFromArr.length !== 2 ||
    timeToArr.length !== 2 ||
    timeFromArr[0] > 23 ||
    timeFromArr[1] > 59 ||
    timeToArr[0] > 23 ||
    timeToArr[1] > 59
  ) {
    alert("Invalid Time Format");
    return;
  }

  const timeFrom = convertTime(eventTimeFrom);
  const timeTo = convertTime(eventTimeTo);

  //check if event is already added
  let eventExist = false;
  eventsArr.forEach((event) => {
    if (
      event.day === activeDay &&
      event.month === month + 1 &&
      event.year === year
    ) {
      event.events.forEach((event) => {
        if (event.title === eventTitle) {
          eventExist = true;
        }
      });
    }
  });
  if (eventExist) {
    alert("Event already added");
    return;
  }
  const newEvent = {
    title: eventTitle,
    time: timeFrom + " - " + timeTo,
  };
  console.log(newEvent);
  console.log(activeDay);
  let eventAdded = false;
  if (eventsArr.length > 0) {
    eventsArr.forEach((item) => {
      if (
        item.day === activeDay &&
        item.month === month + 1 &&
        item.year === year
      ) {
        item.events.push(newEvent);
        eventAdded = true;
      }
    });
  }

  if (!eventAdded) {
    eventsArr.push({
      day: activeDay,
      month: month + 1,
      year: year,
      events: [newEvent],
    });
  }

  console.log(eventsArr);
  addEventWrapper.classList.remove("active");
  addEventTitle.value = "";
  addEventFrom.value = "";
  addEventTo.value = "";
  updateEvents(activeDay);
  //select active day and add event class if not added
  const activeDayEl = document.querySelector(".day.active");
  if (!activeDayEl.classList.contains("event")) {
    activeDayEl.classList.add("event");
  }
});

//function to delete event when clicked on event
eventsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("event")) {
    if (confirm("Are you sure you want to delete this event?")) {
      const eventTitle = e.target.children[0].children[1].innerHTML;
      eventsArr.forEach((event) => {
        if (
          event.day === activeDay &&
          event.month === month + 1 &&
          event.year === year
        ) {
          event.events.forEach((item, index) => {
            if (item.title === eventTitle) {
              event.events.splice(index, 1);
            }
          });
          //if no events left in a day then remove that day from eventsArr
          if (event.events.length === 0) {
            eventsArr.splice(eventsArr.indexOf(event), 1);
            //remove event class from day
            const activeDayEl = document.querySelector(".day.active");
            if (activeDayEl.classList.contains("event")) {
              activeDayEl.classList.remove("event");
            }
          }
        }
      });
      updateEvents(activeDay);
    }
  }
});

//function to save events in local storage
function saveEvents() {
  localStorage.setItem("events", JSON.stringify(eventsArr));
}

//function to get events from local storage
function getEvents() {
  //check if events are already saved in local storage then return event else nothing
  if (localStorage.getItem("events") === null) {
    return;
  }
  eventsArr.push(...JSON.parse(localStorage.getItem("events")));
}

function convertTime(time) {
  //convert time to 24 hour format
  let timeArr = time.split(":");
  let timeHour = timeArr[0];
  let timeMin = timeArr[1];
  let timeFormat = timeHour >= 12 ? "PM" : "AM";
  timeHour = timeHour % 12 || 12;
  time = timeHour + ":" + timeMin + " " + timeFormat;
  return time;
}

document.querySelector('.download-btn').addEventListener('click', function () {
  alert("Obrigado por baixar as regras!");
  // Aqui você pode adicionar código para rastreamento, se necessário.
});
