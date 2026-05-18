import { active } from "browser-sync";
import { fabric } from "fabric";

const burgermenubtn = document.querySelector('.landing__burgermenubtn');
const burgermenu = document.querySelector('.landing__burgermenu');
const exit = document.querySelector('.landing__exit');

burgermenubtn.addEventListener('click', function(){
  burgermenu.classList.add('active');
})
exit.addEventListener('click', function(){
  burgermenu.classList.remove('active');
})

const canvas = new fabric.Canvas('customcanvas',{
    width: 900,
    height: 525,
    backgroundColor: 'gray',
});
const steps = document.querySelectorAll(".custom__step");

steps.forEach((step) =>{
  const pages = document.querySelectorAll('custom__page');
  step.addEventListener('click', function(){
    
    if(step === shapestep){
      
    }else if(step === nailartstep){

    }else if(step === decosstep){

    }else if(step === finishstep){

    }
  })
})

let currentnailart = null;
let currentmold = null;
let currentsize = "m"
const nailartrow = document.querySelector('.custom__nailart');
const shapesrow = document.querySelector('.custom__shapes');
const sizes = document.querySelectorAll('.custom__size');
let shapestate = null
sizes.forEach(function(size){
        size.addEventListener('click', function(){
          if(size.classList.contains('custom__size--xs')){

            currentsize = "xs";
          }else if(size.classList.contains('custom__size--s')){
            currentsize = "s";
          }else if(size.classList.contains('custom__size--m')){
            currentsize = "m";
          }else if(size.classList.contains('custom__size--l')){
            currentsize = "l";
          }
          console.log(currentsize)
        
        })
      });

fetch('../data/data.json')
  .then((response)=>{
    return response.json();
  })
  .then((data)=>{
    data.molds.forEach(function(item){
      const createdelement = {
        p: document.createElement('p'),
        img: document.createElement('img'),
        div: document.createElement('div')
      };
      createdelement.p.classList.add('paragraph');
      createdelement.p.innerText = item.name;
      createdelement.img.classList.add('choice');
      createdelement.img.src = item.img;
      createdelement.div.classList.add('cell');
      createdelement.div.appendChild(createdelement.img);
      createdelement.div.appendChild(createdelement.p);
      shapesrow.appendChild(createdelement.div);
      
      
      createdelement.div.addEventListener('click', function(){
        shapestate = item;
        addImage(item[currentsize]);
      })
    
    });
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

      const nailarturl = item.canvasimg;
      
      div.addEventListener('click', function(){
        
        fabric.Image.fromURL( nailarturl , function(img){
          if(currentnailart){
            canvas.remove(currentnailart);
          }
          img.scaleToHeight(500);
          img.scaleToWidth(500);
          
          canvas.add(img);
          canvas.sendToBack(img);
          canvas.centerObject(img);

          currentnailart = img;
          
          canvas.renderAll();
        });
      })
      
      
    })
  });
  function addImage(url){

      fabric.Image.fromURL( url , function(img){
        img.set({
          "selectable": false,
          "eventable": false,
        })
        if(currentmold){
          canvas.remove(currentmold);
        }
        img.scaleToHeight(500);
        img.scaleToWidth(500);
        
        canvas.add(img);
        canvas.bringToFront(img);
        canvas.centerObject(img);

        currentmold = img;
        
        canvas.renderAll();
      });
  }
