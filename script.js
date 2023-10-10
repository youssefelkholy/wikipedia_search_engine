const search = document.querySelector("input");
const form = document.querySelector("form");
const searchCrads = document.querySelector(".cards");
const errMsg = document.querySelector(".alert");
const line = document.querySelector("hr");

const apiUrl = "https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=";

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // get search input value
    const searchValue = search.value;
    // check if the search input has value or not
    if (searchValue === "") {
        errorMessage("Search Input Can't Be Empty, Please Enter A Search Term ");
        searchCrads.innerHTML = "";
    } else {
        getResults(searchValue); 
    }
});

// function error message
function errorMessage(msg) {
    errMsg.style.display = "block";
    line.style.display = "block";
    errMsg.textContent = msg;
}

// function fetch api data
async function getResults(searchValue) {
    const respone = await fetch(apiUrl + searchValue);
    const results = await respone.json();
    // check if serch term is right
    if (results.query.search.length == 0) {
        errorMessage("Invalid Search, Enter A Valid Search Term!");
        searchCrads.innerHTML = "";
    } else {
        displayResults(results);
    }
}     

// display results
function displayResults(results) {
    line.style.display = "block";
    let output = "";
    // maping on results to show search results data
    results.query.search.forEach(result => {
        let resultUrl = `https://en.wikipedia.org/?cureid=${result.pageid}`;
        output += `
            <div class="card m-2">
                <div class="card-body">
                    <h5 class="card-title">${result.title}</h5>
                    <p class="card-text">
                        ${result.snippet}
                    </p>
                    <a href=${resultUrl} target="_blank" class="card-link btn btn-info text-white">
                        Read More
                    </a>
                </div>
            </div>
        `;
        searchCrads.innerHTML = output;
    });

}