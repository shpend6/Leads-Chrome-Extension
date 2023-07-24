let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const tabBtn = document.getElementById("tab-btn");
const deleteBtn = document.getElementById("delete-btn");
const ulEl = document.getElementById("ul-el");
if (localStorage.getItem("Leads")) {
  myLeads = JSON.parse(localStorage.getItem("Leads"));
  renderLeads(myLeads);
}
inputBtn.addEventListener("click", function () {
  if (inputEl.value == "") {
    return 0;
  }
  myLeads.push(inputEl.value);
  localStorage.setItem("Leads", JSON.stringify(myLeads));
  inputEl.value = "";
  renderLeads(myLeads);
});
tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("Leads", JSON.stringify(myLeads));
    renderLeads(myLeads);
  });
  console.log("hello", myLeads);
});
deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  renderLeads(myLeads);
});
function renderLeads(list) {
  let listItems = "";
  for (let i = 0; i < list.length; i++) {
    listItems += `
            <li>
                <a target='_blank' href='${list[i]}'>
                    ${list[i]}
                </a>
            </li>
        `;
  }
  ulEl.innerHTML = listItems;
}
