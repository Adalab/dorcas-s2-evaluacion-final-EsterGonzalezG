'use strict';
var i=0;
var j=0;
var imagenList;
var itemLi;
var hTitle;
var div;
var p;
var textP;
var newContentP;
var newContentItem;
var textContent;
var imageDefault='https://via.placeholder.com/210x295/cccccc/666666/?text=TV';
var url='http://api.tvmaze.com/search/people?q=';
var button = document.querySelector('.main__button');
var text=document.querySelector('.main__text');
var list=document.querySelector('.main__list-Search');

function appendElem() {
  div.appendChild(imagenList);
  hTitle.appendChild(newContentItem);
  p.appendChild(newContentP);
  div.appendChild(hTitle);
  div.appendChild(p);
  itemLi.appendChild(div);
  list.appendChild(itemLi);
}
function createElem() {
  imagenList=document.createElement('img');
  itemLi = document.createElement('li');
  hTitle=document.createElement('h2');
  p=document.createElement('p');
  div=document.createElement('div');

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
  for (j = 0; j < preferido.length; j++) {
    preferido[j].addEventListener('click', cambiar);
  }
}

function cambiar(event) {
  event.currentTarget.classList.toggle('change');
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

        textContent=datos[i].person.name;
        newContentItem = document.createTextNode(textContent);

        if (datos[i].person.country===null) {
          textP='no ha nacido en ningun lugar';
        }else{
          textP=datos[i].person.country.name;
        }
        newContentP=document.createTextNode(textP);
        if (datos[i].person.image===null) {
          imagenList.src = imageDefault;
        }else{
          imagenList.src =datos[i].person.image.medium;
        }

        appendElem();
      }
      favorite();
    });
}
