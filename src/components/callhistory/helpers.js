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
