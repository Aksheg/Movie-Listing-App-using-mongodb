function setUpdateModalFields(film) {
  let updateModal = document.getElementById("update-movie-modal");
  let form = updateModal.querySelector("form");

  form.querySelector("input[name='title']").value = film.title;
  form.querySelector("input[name='description']").value = film.description;
  form.querySelector("input[name='price']").value = film.price;
  form.querySelector("input[name='image']").value = film.image;

  updateModal.addEventListener("shown.bs.modal", function () {
    form.querySelector("input[name='title']").focus();
  });
}
