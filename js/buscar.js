'use strict';
var i=0;
var j=0;
var imageDefault='https://via.placeholder.com/210x295/cccccc/666666/?text=TV';
var url='http://api.tvmaze.com/search/shows?q=';
var button = document.querySelector('.main__button');
var text=document.querySelector('.main__text');
var list=document.querySelector('.main__list-Search');

button.addEventListener('click', showSearch);
function showSearch() {
  list.innerHTML='';
  fetch(url+text.value)
    .then(function(response){
      return response.json();
    })
    .then(function(datos){
      for (i = 0; i < datos.length; i++) {
        var imagenList=document.createElement('img');
        imagenList.classList.add('main__image');
        var itemLi = document.createElement('li');
        itemLi.classList.add('main__itemList');
        var hTitle=document.createElement('h2');
        hTitle.classList.add('main__title-list');
        var div=document.createElement('div');
        div.classList.add('main__div');
        var newContentItem = document.createTextNode(datos[i].show.name);

        if (datos[i].show.image===null) {

          imagenList.src = imageDefault;
        }else{
          imagenList.src =datos[i].show.image.medium;
          //console.log(img.src +=datos[i].show.image.medium);

        }
        div.appendChild(imagenList);
        hTitle.appendChild(newContentItem);
        div.appendChild(hTitle);
        itemLi.appendChild(div);
        list.appendChild(itemLi);

      }


      favorite();
    });
}

function favorite() {
  var preferido=document.querySelectorAll('.main__div');
  for (j = 0; j <= preferido.length; j++) {
    preferido[j].addEventListener('click', cambiar);
  }
}

function cambiar(event) {
  event.currentTarget.classList.toggle('change');
}
