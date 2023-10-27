export const Colors = {
  primaryBg: '#07012b',
  secondaryBg: '#141132',
  bgLite: '#3f3c57',
  white: '#ffffff',
  orange: '#f54f3b',
  text: '#efedf6',
  textLight: '#84849b',
};

export function formatDateTime(date) {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  const dateTimeFormatter = new Intl.DateTimeFormat('en-US', options);
  const formattedDateTime = dateTimeFormatter.format(date);

  // Replace slashes with hyphens
  const formattedDateTimeWithHyphen = formattedDateTime.replace(/\//g, '-');

  const [dateStr, timeStr] = formattedDateTimeWithHyphen.split(' ');
  return { date: dateStr.replace(',', ''), time: timeStr };
}

export const sortUsers = (data, by) => {
  if (by === 'username') {
    return data.slice().sort((a, b) => a.userName.localeCompare(b.username));
  }
  if (by === 'date') {
    return data.slice().sort((a, b) => a.dateTime - b.dateTime);
  }
  return data;
}

export const filterUserData = (data, searchInput) => data?.filter(user => {
  return user?.username?.toLowerCase().includes(searchInput?.toLowerCase());
});

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

export function convertMsToTime(milliseconds) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;

  // 👇️ If you don't want to roll hours over, e.g. 24 to 00
  // 👇️ comment (or remove) the line below
  // commenting next line gets you `24:00:00` instead of `00:00:00`
  // or `36:15:31` instead of `12:15:31`, etc.
  hours = hours % 24;

  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
    seconds,
  )}`;
}