const input = document.querySelector("#input");
const btn = document.querySelector("#search");
const notfound = document.querySelector(".not_found");
const def = document.querySelector(".def");
const loading = document.querySelector(".loader");

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

  //If result is suggestion
  if (typeof data[0] === "string") {
    loading.style.display = "none";
    const heading = document.createElement("h4");
    heading.innerHTML = "Did you mean?";
    notfound.appendChild(heading);
    data.forEach((element) => {
      const suggestion = document.createElement("span");
      suggestion.classList.add("suggested");
      suggestion.innerHTML = element;
      notfound.appendChild(suggestion);
    });
  }

  //If result is Found
  loading.style.display = "none";
  const definition = data[0].meanings[0].definitions[0].definition;
  def.innerHTML = `Meaning of ${word} : ${definition}`;
}
