document.addEventListener('DOMContentLoaded', () => {
    const endPoint = 'http://localhost:3000/api/v1/notes';
    this.sort(endPoint);

    class Note {
      constructor(data) {
        this.id = data.id;
        this.title = data.title; 
        this.content = data.content;
        Note.all.push(this);
      }
    //each li will have the same id as note. //<button data-id=${this.id}>edit</button>
      renderListItem() {
        return `
          <li data-id=${this.id}>${this.title}</li>
        `;
      }
    }
    
    Note.all = [];

    fetch(endPoint)
      .then(res => res.json())
      .then(json => { 
        json.forEach(note => {
          const newNote = new Note(note);
          document.querySelector('#note-list').innerHTML += newNote.renderListItem();
        });
      });
        
  });


//render new note after save //<button data-id=${note.id}>edit</button>
function renderNote(note){
  let newNote = 
  `
    <li data-id=${note.id}>${note.title}</li>
  `
  document.getElementById('note-list').innerHTML += (newNote)
}

//                  add eventListener to note-list                                       //
const noteList = document.getElementById('note-list')

noteList.addEventListener('click', event => {
  event.preventDefault()
  // updateDom(event.target.dataset.id)              //grab li dataset.id
  let targetId = event.target.dataset.id  
  // console.log(targetId) the same targetId can be obtained by the object 'note' passed to showNote
  //fetch that note 
  fetch(`http://localhost:3000/api/v1/notes/${targetId}`)
    .then(res => res.json())
    .then(note => showNote(note))
})

function showNote(note){
  let noteTitle = document.querySelector('#note-title')
  let noteBody = document.querySelector('#note-body')

  noteTitle.value = note.title
  noteBody.value = note.content
 
 //grab note id and assign it to hidden field, then pass it through a function 
  let currentNoteId = document.getElementById('noteId').value = note.id  
  updateNote(currentNoteId) //passing variable to function
  deleteNote(currentNoteId) //passing variable to function
}

// addEventListener to save button
  // const saveButton = document.getElementById('save')
  document.getElementById('save').addEventListener('click', event => {
    event.preventDefault()
   
  let noteTitle = document.querySelector('#note-title').value
  let noteBody = document.querySelector('#note-body').value

  saveNote(noteTitle, noteBody)
  console.log("save was clicked")
})

// saveNote && fetch POST to database 
function saveNote(noteTitle, noteBody){
  console.log("fetching to save")

  
  fetch("http://localhost:3000/api/v1/notes", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', Accept: 'application/json'
    }, 
    body: JSON.stringify({title: noteTitle, content: noteBody, user_id: 1, city_id: 1})
  }).then(res => res.json())
  .then(note => renderNote(note))
}

// ______________Update Button____________________________________________
//bug: after adding 3 notes to update. All the notes becomes the 3rd note.
//should grab the noteId from hidden field [FIXED]
function updateNote() {
    document.getElementById('update').addEventListener('click', event => {
    let noteTitle = document.querySelector('#note-title').value
    let noteBody = document.querySelector('#note-body').value

    let currentNoteId = document.getElementById('noteId').value
    console.log(currentNoteId)
    // event.preventDefault()
    
      fetch(`http://localhost:3000/api/v1/notes/${currentNoteId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json', Accept: 'application/json'
        },
        body: JSON.stringify({title: noteTitle, content: noteBody, user_id: 1, city_id: 1})
      }).then(res => res.json())
      .then(note => showNote(note))
      // currentNoteId = ''
    })
}

//__________________________Delete Button___________________________________________
function deleteNote(){
  document.getElementById('delete').addEventListener('click', event => {
    event.preventDefault()
    //clear note title and notebody fields
    let noteTitle = document.querySelector('#note-title').value = ''
    let noteBody = document.querySelector('#note-body').value = ''
    let currentNoteId = document.getElementById('noteId').value

    return fetch(`http://localhost:3000/api/v1/notes/${currentNoteId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json', Accept: 'application/json'
      }
    }).then(res => res.json())
    .then(note => updateDom(note.id))
  })
}
//update DOM after deleting note
function updateDom(liId){
  //find the li and remove it
  document.querySelector(`[data-id = '${liId}']`).remove()
  console.log(liId)
}

//display1
  document.getElementById('display1').addEventListener('click', event => {
    console.log('display1 pressed')
    event.preventDefault()
    
    let noteTitle = document.querySelector('#note-title')
    let noteBody = document.querySelector('#note-body')

    let display1h = document.getElementById('display1h')
    let display1p = document.getElementById('display1p')

    display1h.innerHTML = noteTitle.value 
    display1p.innerHTML = noteBody.value
  }) 

  //display2
  document.getElementById('display2').addEventListener('click', event => {
    console.log('display2 pressed')
    event.preventDefault()
    
    let noteTitle = document.querySelector('#note-title')
    let noteBody = document.querySelector('#note-body')

    let display2h = document.getElementById('display2h')
    let display2p = document.getElementById('display2p')

    display2h.innerHTML = noteTitle.value 
    display2p.innerHTML = noteBody.value
  }) 

  //add element to dom 
  function sort(endPoint) {
    console.log(endPoint)
    $("#sort_button").click(function() {
    console.log("clicked");
    fetch(endPoint)
    .then(res => res.json())
    .then(json => {
      console.log(json)
      json.sort(function(a, b) {
        const nameA = a.title.toUpperCase();
        const nameB = b.title.toUpperCase();
        if (nameA < nameB) {
          return -1;

        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      })
      console.log(json)
      const noteList = document.getElementById("note-list")
      noteList.innerHTML = ''
      json.forEach (note => {
        const newNote = new Note(note)
        newNote.renderListItem(note)
        // renderListItem(note))  
      })
    })
  })
};



  //sort 
  //do something with it
  //3rd fresh request 