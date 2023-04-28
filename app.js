const input = document.querySelector("#input");
const btn = document.querySelector("#search");
const notfound = document.querySelector(".not_found");
const def = document.querySelector(".def");
const loading = document.querySelector(".loader");
const heading = document.querySelector(".heading");

//When button is clicked
btn.addEventListener("click", function (e) {
  e.preventDefault();//prevent to reload the page
  const word = input.value;
  //If input is blank
  if (word === "") {
    alert("⚠ Please Type a Word Before Searching ⚠");
    return;
  }
  //Function call
  getData(word);
});

async function getData(word) {
  //API Fetch
  loading.style.display = "block";
  notfound.innerHTML = "";
  def.innerHTML = "";

  const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
  // console.log(response);
  const data = await response.json();

  //If no data is found return No Result
  if (!data || !data.length) {
    loading.style.display = "none";
    notfound.innerText = "No Result Found";
    return;
  }

  //If result is Found
  loading.style.display = "none";
  const definition = data[0].meanings[0].definitions[0].definition;
  def.innerHTML = `Meaning of ${word} : ${definition}`;
}
