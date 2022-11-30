import caloriesBurnt from 'calories-burnt';

export const validateEmail = email => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

export const toUpperCaseFirst = str => {
  const arr = str.split(' ');
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const str2 = arr.join(' ');
  return str2;
};

export const toPercent = (curr, total) => {
  return Math.ceil((curr / total) * 100);
};

export const calculateCaloriesBurnt = (dist, age, weight) => {
  return caloriesBurnt({
    meters: dist,
    slope: -0.015,
    treadmill: false,
    age: age,
    restingHeartBeatsPerMinute: 80,
    kilograms: weight,
  });
};

export const inMilsec = timeStr => {
  const timeArr = String(timeStr).split(':');
  let inMillisec = 0;
  if (timeArr.length == 3) {
    inMillisec =
      parseInt(timeArr[0]) * 3600000 +
      parseInt(timeArr[1]) * 60000 +
      parseInt(timeArr[2]) * 1000;
  } else if (timeArr.length == 2) {
    inMillisec = parseInt(timeArr[0]) * 60000 + parseInt(timeArr[1]) * 1000;
  } else if (timeArr.length == 1) {
    inMillisec = parseInt(timeArr[0]) * 1000;
  } else {
    inMillisec = 0;
  }
  return inMillisec;
};
