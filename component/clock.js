const dateWeek = document.querySelector("#dd");
const hr = document.querySelector("#hr");
const mn = document.querySelector("#mn");
const sc = document.querySelector("#sc");

setInterval(() => {
  let day = new Date();
  let hh = day.getHours();
  let mm = day.getMinutes();
  let ss = day.getSeconds();

  let da = day.getDate();
  let mo = day.getMonth();
  let dd = day.getDay();
  let yy = day.getFullYear();

  hr.innerHTML = formatTime(hh);
  mn.innerHTML = formatTime(mm);
  sc.innerHTML = formatTime(ss);

  function formatTime(time) {
    return time < 10 ? `0${time}` : time;
  }
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  corr = [days[day], months[mo], da, yy];

  //   document.getElementById("day").innerHTML = `,`;

  dateWeek.innerHTML = `${days[dd]} | ${da} ${months[mo]}, ${yy}`;
});

