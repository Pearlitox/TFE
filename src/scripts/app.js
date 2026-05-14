import { fabric } from "fabric";
const url = '../assets/images/SVG/custom/molds/almond-mold.svg';

const init = {
  shapes : document.querySelectorAll('.custom__shape'),
  sizes : document.querySelectorAll('.custom__size'),
  xs : document.querySelectorAll('.custom__size--xs'),
  s : document.querySelectorAll('.custom__size--s'),
  m : document.querySelectorAll('.custom__size--m'),
  l : document.querySelectorAll('.custom__size--l'),
  square : document.querySelector('.custom__shape--square'),
  coffin : document.querySelector('.custom__shape--coffin'),
  almond : document.querySelector('.custom__shape--almond'),
  stiletto : document.querySelector('.custom__shape--stiletto')

}

const canvas = new fabric.Canvas('customcanvas',{
    width: 900,
    height: 500,
    backgroundColor: 'white',
});
let shapestate = 0
let mold = null
init.shapes.forEach((shape) =>{
  shape.addEventListener('click', function(){
    
    let imgurl = '../images/molds/square_medium.webp';
    
      if(shape === init.coffin){
        imgurl ='../images/molds/cercueil_medium.webp';
        shapestate = 1
      }else if(shape === init.almond){
        imgurl ='../images/molds/almond_medium.webp';
        shapestate = 2
      }else if(shape === init.stiletto){
        imgurl ='../images/molds/stiletto_medium.webp';
        shapestate = 3
      }

      fabric.Image.fromURL( imgurl , function(img){
        const mold = img.set({
          "selectable": false,
          "eventable": false
        });
        canvas.getElement(mold);
        mold.scaleToHeight(500);
        mold.scaleToWidth(500);
        canvas.add(mold);
        canvas.centerObject(mold);
        canvas.renderAll();
      });
    
  })
  /*
  init.sizes.forEach((size)=>{

    size.addEventListener('click', function(){
      if(shapestate == 1){
        if(size === init.xs){
          console.log(size);
        }
      }
    })
  })*/
});

const nailartrow = document.querySelector('.custom__nailart')
fetch('../data/data.json')
  .then((response)=>{
    return response.json();
  })
  .then((data)=>{
    console.log(data)
    data.nailart.forEach(function(item){
      const p = document.createElement('p');
      p.classList.add('paragraph');
      p.innerText = item.name;
      const img = document.createElement('img');
      img.classList.add('choice')
      img.src = item.img
      const div = document.createElement('div');
      div.appendChild(img);
      div.appendChild(p);
      div.classList.add("cell");
      nailartrow.appendChild(div); 
      
      
    })
  });

