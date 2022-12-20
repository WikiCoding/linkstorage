let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
//const porque não as posso "reassign"
const deleteBtn = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")
const tabBtn = document.getElementById("tab-btn")
const delBtn = document.getElementById("del-btn")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

tabBtn.addEventListener("click", function() {
  //chrome.tabs é um API, precisamos de ativar em manifest.json
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
  })
})

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage
  render(myLeads)
}
//when I pass in myLeads to render() and then start the function render(leads) leads = myLeads
function render(leads) {
  let listItems = ""

  for (let i = 0; i < leads.length; i++) {

    //listItems += "<li><a target='_blank' href='" + myLeads[i] + "'>" + myLeads[i] + "</a></li>"
    listItems += `


      <li>
        <input type="checkbox" name="checkboxid" id= "check" value=${leads[i]}>
        <a target='_blank' href='${leads[i]}' value=${leads[i]}>
        ${leads[i]}
        </a>
        </input>
      </li>

      `

  }
  ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("click", function() {
  localStorage.clear()
  myLeads = []
  render(myLeads)
})

inputBtn.addEventListener("click", function() {
  myLeads.push(inputEl.value)
  inputEl.value = ""
  //limpar o campo após save
  localStorage.setItem("myLeads", JSON.stringify(myLeads))

  render(myLeads)

})

delBtn.addEventListener('click', (event) => {
            let checkboxes= document.querySelectorAll('input[name="checkboxid"]:checked');
            let output= [];
            checkboxes.forEach((checkbox) => {
                output.push(checkbox.value);
              });

              const found = myLeads.find(element => element == output);
              //document.write("You have selected ", output)
              let indexNum = myLeads.indexOf(found)

              myLeads.splice(indexNum, 1)

              console.log(myLeads)

              localStorage.setItem("myLeads", JSON.stringify(myLeads) )
            //console.log(output)
            //localStorage.removeItem("myLeads[indexNum]")


            render(myLeads)

            //sessionStorage.removeItem(output)

          //  localStorage.removeItem(output);
            //let output= [];
            // checkboxes.forEach((checkbox) => {
            //    output.push(checkbox.value);
            //});
            //document.write("You have selected ", output);
        //});
})

//testing values fromt the array with html key <p id="output-el"></p>

//let output = document.getElementById("output-el")

//output.textContent = myLeads[document.getElementById('checkboxid').checked]
//delete myLeads[x] //apaga o elemento x da array
// checkboxObject.value = text
//delete myLeads[text]
