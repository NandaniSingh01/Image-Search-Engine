const API_KEY = "XWf7sL3Mb8aKYpjxmuOWJMosllmrP5TDmFb6_78Om3c";
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const btn = document.getElementById("show-more");
const defaultMsg = document.getElementById("default");

let keyword = "";
let page = 1;

async function searchImages(){
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${API_KEY}&per_page=12`;
    const response = await fetch(url);

    if(!response.ok)
    {
        defaultMsg.innerHTML = "Search result not found !";
        return;
    }
    const data = await response.json();
        if(page===1)
        {
            searchResult.innerHTML="";
        }
    const results = data.results;
    if(results.length==0)
    {
        defaultMsg.innerHTML = "No results found!";
        return;
    }
    results.map((results)=>{
        const image = document.createElement("img");
        image.src = results.urls.small;
        const imageLink = document.createElement("a");
        imageLink.href = results.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image);

        searchResult.appendChild(imageLink);
    })
    btn.style.display="block";
}
searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    page = 1;
    defaultMsg.innerHTML="";
    searchImages();
});

btn.addEventListener("click",()=>{
    page++;
    searchImages();
})