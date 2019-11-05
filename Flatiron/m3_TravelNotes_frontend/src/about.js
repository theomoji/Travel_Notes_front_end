document.addEventListener('DOMContentLoaded', () => {
    // const endPoint = 'http://localhost:3000/api/v1/notes';
    // about(endPoint)
});

// ---------------
function createNode(element) {
    return document.createElement(element);

}

function append(parent, element) {
    return parent.appendChild(element)
}

const ul = document.getElementById('name');

// ---------------

    document.getElementById('aboutMe').addEventListener('click', event => {
        event.preventDefault();
        console.log("about me was clicked");
        fetch('http://localhost:3000/api/v1/users/1')
        .then(res => res.json())
        .then(user => displayName(user))
        noteList.innerHTML = ''
        document.getElementById('name').innerHTML = ''
    }) 

    function displayName(user) {
        let name = user.name;
        // console.log(user)
        // console.log(user.id);
        // console.log(user.notes);  
        //so this returns all the users notes. 
        //now just render it

            let li = document.createElement('li');
            let span = document.createElement('span');
            let ul = document.getElementById('name')
            span.innerHTML = name
            append(ul, li)
            append(li, span)

            let userNotes = user.notes 
            let userId = user.id
           
            renderNotes(userNotes)
        }

        function renderNotes(userNotes) {
            noteTitles = []
            userNotes.forEach(note => {
           
                noteTitles.push(note.title)
             
            });
          
            sortNotes(noteTitles)
        } 

        function sortNotes(noteTitles) {
            console.log(noteTitles)
            noteTitles.sort();
            console.log(noteTitles)
            noteTitles.forEach(title => {
                let noteList = document.getElementById('noteList')
                noteList.innerHTML +=
                `<li data-id=${title.id}>  ${title} </li>`
            })
        }
    

//done//ajax practice making calls to different end points and different type of calls/gets/delete/edit 
//done//3 diff ajax calls 
//missed//sophie & howard host study session

//created an about page
//rendered user name on user page
//added users_controller + users_serializer
//rendered and sorted note titles from the user (has_many relationship) 


