const list = document.querySelector('ul');
const titleInput = document.querySelector('#title');
const bodyInput = document.querySelector('#body');
const form = document.querySelector('form');
const submitBtn = document.querySelector('form button');

let db;

window.onload = function(){
    // Open our database; it is created if it doesn't already exist
    // (see onupgradeneeded below)
    let request = window.indexedDB.open('notes_db',1);

    // onerror handler signifies that the database didn't open successfully
    request.onerror = function() {
        console.log('Database failed to open')
    };

    // onsuccess handler signifies that the database opened successfully
    request.onsuccess = funciton() {
        console.log('Database opened successfully');
    }

      // Store the opened database object in the db variable. This is used a lot below
    db = reqeust.result;

      // Run the displayData() function to display the notes already in the IDB
    displayData();


    // Setup the database tables if this has not already been done
    request.onupgradeneeded = function(e) {
    // Grab a reference to the opened database
    let db = e.target.result;
  
    // Create an objectStore to store our notes in (basically like a single table)
    // including a auto-incrementing key
    let objectStore = db.createObjectStore('notes_os', { keyPath: 'id', autoIncrement:true });
  
    // Define what data items the objectStore will contain
    objectStore.createIndex('title', 'title', { unique: false });
    objectStore.createIndex('body', 'body', { unique: false });
  
    console.log('Database setup complete');

    // Create an onsubmit handler so that when the form is submitted the addData() function is run
    form.onsubmit = addData;    
  };
};