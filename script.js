// https://jsonplaceholder.typicode.com/users  -- JSON PLACEHOLDER

const userCardTemplate = document.querySelector("[data-user-template")

const userCardContainer = document.querySelector('[data-user-cards-container]')

const searchInput = document.querySelector('[data-search]')

const resultsBox = document.querySelector(".result-box")
const inputBox = document.querySelector("#search")

let URL = "https://jsonplaceholder.typicode.com/users"

let users = []

const fetchKeywords = async (input) => {
    let inputData = await fetch(URL)
    console.log(inputData)
    let dataIn = await inputData.json()
    let storage = dataIn.map(userInfo => userInfo.name)

    displayBox(storage);
    return storage;
}


// function displayBox(storage) {

//     storage.forEach(userInfo => {
//         users = storage.map(userInfo => {
//             const cards = userCardTemplate.content.cloneNode(true).children[0];
//             const header = cards.querySelector('[data-header]');
//             const body = cards.querySelector('[data-body]');

//             header.textContent = userInfo.name;
//             body.textContent = userInfo.email;
//             cards.addEventListener("click", () => {
              
//                 console.log(`Clicked on ${userInfo.name}`);
//             });
//             userCardContainer.append(storage)
//             return { name: userInfo.name, email: userInfo.email, element: cards }

//         });
//     });
// }


inputBox.onkeyup = async () => {
    let result = []
    let input = inputBox.value;
    if (input.length) {
        const list = await fetchKeywords(input)
        result = list.filter((keyword) => {
            return keyword.toLowerCase().includes(input.toLowerCase());

        });
        display(result);
        if (!result.length) {
            resultsBox.innerHTML = '';
        }
    }
}
function display(result) {
    const content = result.map((list) => {
        return "<li onclick=selectInput(this)>" + list + "</li>";
    });
    resultsBox.innerHTML = "<ul>" + content.join('') + " </ul>"
}
function selectInput(list) {
    inputBox.value = list.innerHTML;
    resultsBox.innerHTML = "";
}



// searchInput.addEventListener("input", e => {
//     const value = e.target.value.toLowerCase();
//     users.forEach(userInfo => {
//         const isVisible = userInfo.name.toLowerCase().includes(value) || userInfo.email.toLowerCase().includes(value)
//         userInfo.element.classList.toggle("hide", !isVisible)
//     })
// })

