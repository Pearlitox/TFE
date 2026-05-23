
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
    backgroundColor: '#dcdedc',
});

const deletebtn = document.querySelector('.custom__delete');
const clearbtn = document.querySelector('.custom__clear');

deletebtn.addEventListener('click', function(){
  let obj = canvas.getActiveObject();
  canvas.remove(obj);
});
clearbtn.addEventListener('click', function(){
  let canvasobj = canvas.getObjects();
  canvasobj.forEach((obj)=>{
    canvas.remove(obj);
  })
});
const steps = document.querySelectorAll(".custom__step");
const pages = document.querySelectorAll('.custom__page');
steps.forEach((step, index) => {
  if(index === 0){
    pages[index].classList.remove('hidden');
  }else{
    pages[index].classList.add('hidden');  
  }
  step.addEventListener('click', function(btn){
    steps.forEach(function(step){
      step.classList.remove('active');
    }) 
    pages.forEach(function(page){
      page.classList.add('hidden');
  })
    pages[index].classList.remove('hidden');
    steps[index].classList.add('active');
  })
})

let currentnailart = null;
let currentmold = null;
let currentsize = "m"
let currentbase = "white"
const nailartrow = document.querySelector('.custom__nailart');
const shapesrow = document.querySelector('.custom__shapes');
const deco2drow = document.querySelector('.custom__deco--2d');
const deco3drow = document.querySelector('.custom__deco--3d');
const basecolorrow = document.querySelector('.custom__colors--base');
const nailartcolorrow = document.querySelector('.custom__colors--nailart');
const decocolorrow = document.querySelector('.custom__colors--deco');
const sizes = document.querySelectorAll('.custom__size');
let shapestate = null;
let nailartstate = null;
let colorstate = "white";
let basecolor = null;
let decostate = null;
let is2d = true;

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
        addMold(item[currentsize]);
        
      const objectIndex = canvas.getObjects().indexOf(currentmold);
      
        
      })
    
    });
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
          addMold(shapestate[currentsize])
          
        })
      });
    data.base.forEach(function(item){
        basecolor = item
    })
    data.colors.forEach(function(item){
        const coloricon = document.createElement('img');
        coloricon.src = item.img;
        coloricon.classList.add('color');
        basecolorrow.appendChild(coloricon);
        coloricon.addEventListener('click' ,function(){
          colorstate = item.name
          addBasecolor(basecolor[colorstate]);
        });
      });
    
    data.nailart.forEach(function(item){
      const createdelement = {
        p: document.createElement('p'),
        img: document.createElement('img'),
        div: document.createElement('div')
      };
      createdelement.p.classList.add('paragraph');
      createdelement.img.classList.add('choice');
      createdelement.div.classList.add('cell');
      createdelement.div.appendChild(createdelement.img);
      createdelement.div.appendChild(createdelement.p);
      nailartrow.appendChild(createdelement.div);
      createdelement.img.src = item.img;
      createdelement.p.innerText = item.name;  
      createdelement.div.addEventListener('click', function(){
        
        nailartstate = item;
        addNailart(item.white)
        
      })
    
    });
    data.colors.forEach(function(item){
        const coloricon = document.createElement('img');
        coloricon.src = item.img;
        coloricon.classList.add('color');
        nailartcolorrow.appendChild(coloricon);
        coloricon.addEventListener('click' ,function(){
          colorstate = item.name
          addNailart(nailartstate[colorstate]);
        });
      });
      
      data.decos2d.forEach(function(item){
        const createdelement = {
          p: document.createElement('p'),
          img: document.createElement('img'),
          div: document.createElement('div')
        };
        createdelement.p.classList.add('paragraph');
        createdelement.img.classList.add('choice');
        createdelement.div.classList.add('cell');
        createdelement.div.appendChild(createdelement.img);
        createdelement.div.appendChild(createdelement.p);
        deco2drow.appendChild(createdelement.div);
        createdelement.img.src = item.img;
        createdelement.p.innerText = item.name;  
        createdelement.div.addEventListener('click', function(){
          is2d = true;
          console.log(is2d)
          decostate = item;
        
        });   
      });
      
      data.decos3d.forEach(function(item){
        const createdelement = {
          p: document.createElement('p'),
          img: document.createElement('img'),
          div: document.createElement('div')
        };
        createdelement.p.classList.add('paragraph');
        createdelement.img.classList.add('choice');
        createdelement.div.classList.add('cell');
        createdelement.div.appendChild(createdelement.img);
        createdelement.div.appendChild(createdelement.p);
        deco3drow.appendChild(createdelement.div);
        createdelement.img.src = item.img;
        createdelement.p.innerText = item.name;  
        createdelement.div.addEventListener('click', function(){
          is2d = false;
          console.log(is2d)
          decostate = item;
        });
      
    
      });
      data.colors.forEach(function(item){
        const coloricon = document.createElement('img');
        coloricon.src = item.img;
        coloricon.classList.add('color');
        decocolorrow.appendChild(coloricon);
        coloricon.addEventListener('click' ,function(){
          colorstate = item.name;
          if(is2d === true){
            addDecos2d(decostate[colorstate]);

          }else if(is2d === false){
            addDecos3d(decostate[colorstate]);
          }
          
        });
      });
  });


  
  function addMold(url){

      fabric.Image.fromURL( url , function(img){
        img.set({
          "selectable": false,
          "eventable": false,
        });
        if(currentmold){
          canvas.remove(currentmold);
        }
        img.scaleToHeight(500);
        img.scaleToWidth(500);
        
        canvas.add(img);
        canvas.moveTo(img, 4);
        canvas.centerObject(img);

        currentmold = img;
        
        canvas.renderAll();
      });
  }


  
  function addNailart(url){

      fabric.Image.fromURL( url , function(img){


        if(currentnailart){
          canvas.remove(currentnailart);
        }
        img.set({
        });
        img.scaleToHeight(500);
        img.scaleToWidth(500);
        
        canvas.add(img);
        canvas.sendBackwards(img);
        canvas.centerObject(img);

        currentnailart = img;
        
        canvas.renderAll();
      });
  }
  function addBasecolor(url){

      fabric.Image.fromURL( url , function(img){
      
        if(currentbase){
          canvas.remove(currentbase);
        }
        img.set({
          "selectable": false,
          "eventable": false,
        });
        img.scaleToHeight(500);
        img.scaleToWidth(500);
        
        canvas.add(img);
        canvas.sendToBack(img);
        canvas.centerObject(img);

        currentbase = img;
        
        canvas.renderAll();
      });
  }
  function addDecos2d(url){

      fabric.Image.fromURL( url , function(img){
        
        img.scaleToHeight(100);
        img.scaleToWidth(100);
        canvas.add(img);
        canvas.moveTo(img, 2);
        canvas.renderAll();
      });
  }
  function addDecos3d(url){

      fabric.Image.fromURL( url , function(img){
        
        img.scaleToHeight(100);
        img.scaleToWidth(100);
        canvas.add(img);
        canvas.bringToFront(img);
        canvas.renderAll();
      });
  }
