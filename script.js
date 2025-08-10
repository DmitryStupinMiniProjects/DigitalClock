const clockTimeElement = document.querySelector("[data-js-time]");
const clockDateElement = document.querySelector("[data-js-date]");
const clockFormatElement = document.querySelector("[data-js-format]");

// Текущий формат времени, по умолчанию 24h
let timeFormat = "24h";

clockFormatElement.addEventListener("click", () => {
  timeFormat = timeFormat === "24h" ? "12h" : "24h";
  clockFormatElement.textContent = timeFormat;
  // При смене формата сразу обновляем время
  renderTime(new Date());
});

const getWeekDay = (date) => {
  let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  return days[date.getDay()];
};

const getMonth = (date) => {
  let month = ['Января', "Февраля", "Марта", "Апреля", "Мая", "Июня",
    "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
  return month[date.getMonth()];
};

const renderTime = (now) => {
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  if (timeFormat === "12h") {
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // 0 -> 12
    clockTimeElement.textContent =
      `${hours < 10 ? '0' + hours : hours}:` +
      `${minutes < 10 ? '0' + minutes : minutes}:` +
      `${seconds < 10 ? '0' + seconds : seconds} ${ampm}`;
  } else {
    clockTimeElement.textContent =
      `${hours < 10 ? '0' + hours : hours}:` +
      `${minutes < 10 ? '0' + minutes : minutes}:` +
      `${seconds < 10 ? '0' + seconds : seconds}`;
  }
};

const renderDate = (now) => {
  let weekDay = getWeekDay(now);
  let monthDay = now.getDate();
  let month = getMonth(now);
  let year = now.getFullYear();

  clockDateElement.textContent = `${weekDay}, ${monthDay} ${month} ${year}`;
};

// Запускаем обновление даты и времени
renderDate(new Date());
setInterval(() => renderDate(new Date()), 60000);
setInterval(() => renderTime(new Date()), 1000);
