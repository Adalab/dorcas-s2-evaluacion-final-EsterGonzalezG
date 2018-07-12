'use strict';
var i=0;
var j=0;
var imagenList;
var itemLi;
var hTitle;
var div;
var newContentItem;
var textContent;
var arrayFavorito=[];
var savedTasks;
var imageDefault='https://via.placeholder.com/210x295/cccccc/666666/?text=TV';
var url='https://api.tvmaze.com/search/shows?q=';
var button = document.querySelector('.main__button');
var text=document.querySelector('.main__text');
var list=document.querySelector('.main__list-Search');

function appendElem() {
  div.appendChild(imagenList);
  hTitle.appendChild(newContentItem);
  div.appendChild(hTitle);
  itemLi.appendChild(div);
  list.appendChild(itemLi);
}
function createElem() {
  imagenList=document.createElement('img');
  itemLi = document.createElement('li');
  hTitle=document.createElement('h2');
  div=document.createElement('div');
  newContentItem = document.createTextNode(textContent);
  addClassElement();
}
function addClassElement() {
  imagenList.classList.add('main__image');
  itemLi.classList.add('main__itemList');
  hTitle.classList.add('main__title-list');
  div.classList.add('main__div');
}
function favorite() {
  var preferido=document.querySelectorAll('.main__div');
  for (j = 0; j <= preferido.length; j++) {
    preferido[j].addEventListener('click', cambiar);
  }
}

function cambiar(event) {
  event.currentTarget.classList.toggle('change');

  savedTasks = JSON.parse(localStorage.getItem('arrayFavorito'));

  if(event.currentTarget.classList.contains('change')){
    arrayFavorito.push(event.currentTarget.getAttribute('data-fav'));
    console.log('tiene la clase',arrayFavorito);
    localStorage.setItem('arrayFavorito', JSON.stringify(arrayFavorito));
  }else{
    for (var i = 0; i < arrayFavorito.length; i++) {
      if (arrayFavorito[i]===event.currentTarget.getAttribute('data-fav')) {
        arrayFavorito.splice( i, 1);
        localStorage.setItem('arrayFavorito', JSON.stringify(arrayFavorito));
        console.log('quitar fav',arrayFavorito);
      }
    }
  }

}

button.addEventListener('click', showSearch);
function showSearch() {
  list.innerHTML='';
  fetch(url+text.value)
    .then(function(response){
      return response.json();
    })
    .then(function(datos){
      for (i = 0; i < datos.length; i++) {
        createElem();

        textContent=datos[i].show.name;


        div.setAttribute('data-fav',datos[i].show.id);
        //savedTasks = JSON.parse(localStorage.getItem('arrayFavorito'));
        // for (var i = 0; i < savedTasks.length; i++) {
        //   if(savedTasks[i]===div.getAttribute('data-fav'))  {
        //     div[i].classList.add('change');
        //   }
        //
        // }



        if (datos[i].show.image===null) {
          imagenList.src = imageDefault;
        }else{
          imagenList.src =datos[i].show.image.medium;
        }

        appendElem();
      }
      favorite();
    });
}
