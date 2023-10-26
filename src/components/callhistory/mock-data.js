const templateData = {
  time: '00:00:01',
  transcript: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus',
  transcript2: 'Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.',
  isComplete: true
};

function generateRandomDataArray(maxLength) {
  const randomData = [];
  const daysOfWeek = ['Caller', 'Callee'];

  for (let i = 0; i < maxLength; i++) {
    const randomDay = daysOfWeek[Math.floor(Math.random() * daysOfWeek.length)];
    const randomTime = `${randomDay} - ${Math.floor(Math.random() * 24).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`;
    const randomTranscript = generateRandomText(120); // Limit transcript to 120 characters
    const randomIsComplete = Math.random() < 0.5; // Random true or false

    randomData.push({
      time: randomTime,
      transcript: `${templateData.transcript} ${Math.random() < 0.5 ? templateData.transcript : ''}`,
      isComplete: randomIsComplete
    });
  }

  return randomData;
}

function generateRandomText(maxLength) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const textLength = Math.floor(Math.random() * maxLength) + 1; // Random text length up to the specified maximum
  let randomText = '';

  for (let i = 0; i < textLength; i++) {
    randomText += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return randomText;
}

const maxLength = 10;
export const randomTranscriptData = generateRandomDataArray(maxLength);


export const userData = [];

const getRandomUserName = () => {
  const adjectives = ['Happy', 'Sad', 'Funny', 'Serious', 'Lucky', 'Smart', 'Clever', 'Sleepy', 'Active', 'Quiet'];
  const nouns = ['Cat', 'Dog', 'Panda', 'Monkey', 'Elephant', 'Lion', 'Tiger', 'Zebra', 'Dolphin', 'Kangaroo'];
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${randomAdjective}${randomNoun}`;
};

const generateRandomDate = (start, end) => {
  const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
  return new Date(randomTime);
};

function generateUserID() {
  const min = 100000; // The minimum numeric value (100000)
  const max = 999999; // The maximum numeric value (999999)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

for (let i = 0; i < 20; i++) {
  const username = getRandomUserName();
  const dateTime = generateRandomDate(new Date(2022, 0, 1), new Date());
  userData.push({ username, dateTime, id: generateUserID() });
}
