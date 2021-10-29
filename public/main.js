var trash = document.getElementsByClassName("fa-trash-alt");
let completed = document.getElementsByClassName("fa-square")

Array.from(trash).forEach(function (element) {
  element.addEventListener("click", function () {
    const id = this.parentNode.parentNode.childNodes[1].innerText;
   
    console.log(id)

    fetch("listItems", {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'id': id
        
      })
    }).then(function (response) {
      window.location.reload();
    });
  });
});
Array.from(completed).forEach(function (element) {
  element.addEventListener("click", function () {
    const id = this.parentNode.parentNode.childNodes[1].innerText;
  
    fetch("update", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
       'id': id
      }),
    })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((data) => {
        console.log(data);
        window.location.reload(true);
      });
  });
});
