new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true; // Change this to false to test rejection
    if (success) {
      resolve('Promise resolved successfully!');
    } else {
      reject('Promise rejected.');
    }
  }, 2000);
})
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.error(error);
  });
//   for veledation of voting right under some ae
new Promise((resolve, reject) => {
  const age = 20; // Change this value to test different scenarios
  if (age >= 18) {
    resolve('You are eligible to vote.');
  } else {
    reject('You are not eligible to vote.');
  }
}
)
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.error(error);
  });
//   async function to demonstrate async/await
async function fetchData() {
  try {
    const response = await new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = true; // Change this to false to test rejection
        if (success) {
          resolve('Data fetched successfully!');
        } else {
          reject('Failed to fetch data.');
        }
      }, 2000);
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

fetchData();