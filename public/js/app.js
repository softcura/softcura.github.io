

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data);
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');



weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const loction = search.value;
    document.getElementById('message-1').style.color = "black";
    messageOne.textContent = 'Loading....';
    messageTwo.textContent = '';
    fetch(`/weather?address=${loction}`).then((resp)=>{
        resp.json().then((data)=>{
            if(data.error) {
                messageTwo.textContent = '';
                document.getElementById('message-1').style.color = "red";
                messageOne.textContent = data.error;
            }
            else {
                messageOne.textContent = '';
                messageOne.textContent = `${data.location}`;
               //om alleen de kleu van error effe naar blauw te veranderen
                document.getElementById('message-1').style.color = "blue";
                document.getElementById('message-2').style.color = "blue";
                messageTwo.textContent = `${data.forecast}`;
            }

        })
    })

})