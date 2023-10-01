const input = document.getElementById('input');
const grid = document.querySelector('.grid');
const searchIcon = document.getElementById('searchIcon');
// курсор в input
window.addEventListener('load', function () {
  input.focus();
  input.value = 'Wroclaw';
  photos();
  input.value = '';
});
// леняем лупу на крестик проверяем, не пустое ли значение в поле ввода input. 
//Если поле не пустое, удаляем класс fa-magnifying-glass и добавляем класс fa-xmark
input.addEventListener('input', function () {
  if (input.value.trim() !== '') {
    searchIcon.classList.remove('fa-magnifying-glass');
    searchIcon.classList.add('fa-xmark');
  } else {
    searchIcon.classList.remove('fa-xmark');
    searchIcon.classList.add('fa-magnifying-glass');
  }

});

// очистка введеного
searchIcon.addEventListener('click', function () {
  if (searchIcon.classList.contains('fa-xmark')) {
    // Если выбран класс 'fa-xmark', очищаем значение инпута
    input.value = '';
  }
});

input.addEventListener('keydown', function (event) {
  if (event.key === "Enter")

    photos()

})
// очистка старых фото
function deletePhotos() {
  grid.innerHTML = '';
}

function photos() {

  deletePhotos();

  const url = `https://api.unsplash.com/search/photos?query=${input.value}&per_page=9&orientation=landscape&client_id=se_3jsAV4nkG0MvM8FwCH0MyscY1vuBcu4okEVw-SBY`;

  fetch(url)

    .then(response => {
      if (response.ok)
        return response.json();
      else
        alert(response.status)
    })

    .then(data => {
      const photo = [];
      for (let i = 0; i < data.results.length; i++) {
        photo[i] = document.createElement('div');
        photo[i].className = 'img';
        photo[i].style.backgroundImage = 'url(' + data.results[i].urls.raw + ')';
        photo[i].addEventListener('dblclick', function () {
          window.open(data.results[i].links.download, '_blank');
        })
        grid.appendChild(photo[i]);
      }
    })
}


