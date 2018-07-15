'use strict';
var i=0;
var j=0;
var imagenList;
var itemLi;
var hTitle;
var div;
var array=[];
var newContentItem;
var textContent;
var idEpis;
var capitulos;
var h3;
var imageDefault='https://via.placeholder.com/210x295/cccccc/666666/?text=TV';
var url='https://api.tvmaze.com/search/shows?q=';
var button = document.querySelector('.main__button');
var text=document.querySelector('.main__text');
var list=document.querySelector('.main__list-Search');
var parrafo=document.querySelector('.parrafo');
function appendElem() {
  div.appendChild(imagenList);
  hTitle.appendChild(newContentItem);
  div.appendChild(hTitle);
  div.appendChild(h3);
  itemLi.appendChild(div);
  list.appendChild(itemLi);
}
function createElem() {
  imagenList=document.createElement('img');
  itemLi = document.createElement('li');
  hTitle=document.createElement('h2');
  h3=document.createElement('h3');
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
  for (j = 0; j <= preferido.length; j++) {
    preferido[j].addEventListener('click', cambiar);
  }
}
function clearResults() {
  var allResults = document.querySelectorAll('.main__itemList');
  //console.log(allResults);
  for (var i = 0; i < allResults.length; i++) {
    allResults[i].remove();

  }
}

function cambiar(event) {
  event.currentTarget.classList.toggle('change');
  parrafo.append(event.currentTarget.children[1].innerHTML+' ,');
}
button.addEventListener('click', showSearch);
function showSearch() {
  //list.innerHTML='';
  clearResults();
  fetch(url+text.value)
    .then(function(response){
      return response.json();
    })
    .then(function(datos){
      for (i = 0; i < datos.length; i++) {
        createElem();
        console.log(div);
        textContent=datos[i].show.name;
        idEpis=datos[i].show.id;
        //console.log(idEpis);
        h3.append(document.createTextNode(array[i]));
        console.log(div);
        newContentItem = document.createTextNode(textContent);
        if (datos[i].show.image===null) {
          imagenList.src = imageDefault;
        }else{
          imagenList.src =datos[i].show.image.medium;
        }
        numberEpis(textContent);
        appendElem();
      }
      favorite();
    });
}
function numberEpis(textContent) {
  fetch( 'http://api.tvmaze.com/shows/'+idEpis+'/episodes')
    .then(function (response) {
      //console.log(response.json());
      return response.json();
    })
    .then(function (datosEpisodios) {
      var episodios=datosEpisodios.length;
      array.push(episodios);
      //console.log(array);
      //console.log(textContent,episodios);
    });
}
