const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const root = __dirname;

// data source
const url = 'http://jsonplaceholder.typicode.com/posts';

async function fetch_and_write() {
  try {
    // fetches the data
    const data = await fetch(url).then((res) => res.json());

    // converts the data to json
    const toJson = JSON.stringify(data);

    const fileRoot = path.join(root, 'result');

    /*
    checks if the directory exists,
    if it exists, create a file in the directory called posts.json
    else, creates a directory called result and writes the data to a file called posts.json in the directory 
    */

    if (fs.existsSync(fileRoot)) {
      fs.writeFile(`${fileRoot}/posts.json`, toJson, (err) => {
        if (err) {
          throw err;
        }
      });
    } else {
      fs.mkdir('result', (err) => {
        if (err) {
          console.log(err);
        }
      });

      fs.writeFile(`${fileRoot}/posts.json`, toJson, (err) => {
        if (err) {
          throw err;
        }
      });
    }
  } catch (error) {
    throw error;
  }
}

fetch_and_write();
