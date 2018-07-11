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
  fetch(url+text.value)
    .then(function(response){
      return response.json();
    })
    .then(function(datos){
      var listItem='';
      for (i = 0; i < datos.length; i++) {
        // var nombre=datos[i].show.name;
        // var imagen=document.createElement('img');
        // var div=document.createElement('div');
        // var li=document.createElement('li');
        // var newContentName = document.createTextNode(nombre);
        // imagen.src=datos[i].show.image.medium;
        // li.append(imagen,nombre);
        // list.append(li);
        //  div.append(list);

        if (datos[i].show.image===null) {

          listItem =  listItem + '<li class="itemList"><div class="main__div">' +'<img src="' +imageDefault+'"/>' +'<h2 class="title__list">'+ datos[i].show.name+ '<h2></div></li>';
        }else{
          listItem =  listItem + '<li class="itemList"><div class="main__div">' +'<img src="' +datos[i].show.image.medium+'"/>' +'<h2 class="title__list">'+ datos[i].show.name+ '<h2></div></li>';
        }

      }

      //favorite();
      list.innerHTML=listItem;
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
    event.currentTarget.classList.toggle("change");

}
