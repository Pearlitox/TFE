import { fabric } from "fabric";

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

//ajouter des images dans le canvas
let currentnailart = null;
let currentmold = null;
let shapestate = 0
const nailartrow = document.querySelector('.custom__nailart');
const shapesrow = document.querySelector('.custom__shapes');
const sizes = document.querySelectorAll('.custom__size');

sizes.forEach(function(size){
        size.addEventListener('click', function(){
          if(size === 'custom__size--xs'){
            shapestate = 1;
          }else if(size === 'custom__size--xs'){
            shapestate = 2;
          }else if(size === 'custom__size--xs'){
            shapestate = 3;
          }else if(size === 'custom__size--xs'){
            shapestate = 4;
          }
          console.log(shapestate)
        
        })
      });


fetch('../data/data.json')
  .then((response)=>{
    return response.json();
  })
  .then((data)=>{
    sizes.forEach(function(size){
        size.addEventListener('click', function(){
          if(size = 'custom__size--xs'){
            shapestate = 1;
            const moldurl = item.xs;
            
          }else if(size = 'custom__size--xs'){
            shapestate = 2;
            const moldurl = item.s;
          }else if(size = 'custom__size--xs'){
            shapestate = 3;
            const moldurl = item.m;
          }else if(size = 'custom__size--xs'){
            shapestate = 4;
            const moldurl = item.l;
          }
          console.log(shapestate)
        
        })
      });
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
      const moldurl = item.m;
      
      createdelement.div.addEventListener('click', function(){
        fabric.Image.fromURL( moldurl , function(img){
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
