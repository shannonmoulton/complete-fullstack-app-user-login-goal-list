var trash = document.getElementsByClassName("fa-trash");

Array.from(trash).forEach(function (element) {
  element.addEventListener("click", function () {
    const name = this.parentNode.parentNode.childNodes[1].innerText;
    const msg = this.parentNode.parentNode.childNodes[3].innerText;
    fetch("listItems", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: category,
        idea: idea,
        notes: notes,
      }),
    }).then(function (response) {
      window.location.reload();
    });
  });
});
