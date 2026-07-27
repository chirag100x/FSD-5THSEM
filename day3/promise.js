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