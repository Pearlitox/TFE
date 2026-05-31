import { fabric } from "fabric";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

//Animation étoile
gsap.to('.tutorial__nailfile',{
  x: 15,
  y: -10,
  duration: 0.5,
  repeat: -1,
  yoyo: true,
})

gsap.registerPlugin(ScrollTrigger);
  gsap.to('.landing__stars', {
    yPercent: 10,
    scrollTrigger : {
      trigger: '.landing',
      start: 'top top',
      end: "bottom+=2000",
      scrub: true,
    },
  });
  gsap.to('.collections__stars', {
    yPercent: 10,
    scrollTrigger : {
      trigger: '.collections',
      start: 'top top',
      end: "bottom+=2000",
      scrub: true,
    },
  });
  gsap.to('.collections__star', {
    yPercent: -40,
    scrollTrigger : {
      trigger: '.landing',
      start: 'top top',
      end: "bottom+=2000",
      scrub: true,
    },
  });
  gsap.to('.exemples__star', {
    yPercent: -40,
    scrollTrigger : {
      trigger: '.exemples',
      start: 'top bottom',
      end: "bottom+=2000",
      scrub: true,
    },
  });
  gsap.to('.products__star', {
    yPercent: -40,
    scrollTrigger : {
      trigger: '.products',
      start: 'top bottom',
      end: "bottom+=2000",
      scrub: true,
    },
  });
gsap.to('.products__stars', {
    yPercent: 10,
    scrollTrigger : {
      trigger: '.products',
      start: 'top bottom',
      end: "bottom+=2000",
      scrub: true,
    },
  });
gsap.to('.socialmedias__stars', {
    yPercent: 10,
    scrollTrigger : {
      trigger: '.socialmedias',
      start: 'top bottom',
      end: "bottom+=2000",
      scrub: true,
    },
  });


//burgermenu
const burgermenubtn = document.querySelector('.landing__burgermenubtn');
const burgermenu = document.querySelector('.landing__burgermenu');
const exit = document.querySelector('.landing__exit');
const aboutusbtn = document.querySelector('.landing__link--aboutus');
const aboutus = document.querySelector('.aboutus')
burgermenubtn.addEventListener('click', function(){
  burgermenu.classList.add('active');
})
exit.addEventListener('click', function(){
  burgermenu.classList.remove('active');
})

aboutusbtn.addEventListener('click', function(){
  aboutus.scrollIntoView({behavior: "smooth"})
})
//canvas init
const canvas = new fabric.Canvas('customcanvas',{
    width: 900,
    height: 525,
    backgroundColor: '#dcdedc',
});

//bouton supprimer et effacer le canvas
const deletebtn = document.querySelector('.custom__delete');
const clearbtn = document.querySelector('.custom__clear');
const backward = document.querySelector('.custom__backward');
const forward = document.querySelector('.custom__forward');
if(deletebtn&&clearbtn&&forward&&backward){
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
  backward.addEventListener('click', function(){
    let obj = canvas.getActiveObject();
    canvas.sendBackwards(obj);
  });
  forward.addEventListener('click', function(){
    let obj = canvas.getActiveObject();
    canvas.bringForward(obj);
  });
}

//étapes customisation
const steps = document.querySelectorAll(".custom__step");
const pages = document.querySelectorAll('.custom__page');

if(steps&&pages){
  steps.forEach((step, index) => {
    if(index === 0){
      pages[index].classList.remove('hidden');
    }else{
      pages[index].classList.add('hidden');  
    }
    step.addEventListener('click', function(btn){
      steps.forEach(function(step){
      step.classList.remove('selected');
    });
    pages.forEach(function(page){
      page.classList.add('hidden');
    });
    pages[index].classList.remove('hidden');
    steps[index].classList.add('selected');
    });
  });
};


//éditeur canvas
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


fetch('/assets/data/data.json')
  .then((response)=>{
    return response.json();
  })
  .then((data)=>{
    //filtrer les produits
    const select = document.querySelector('.productsgallery__filter');
    const input = document.querySelector('.productsgallery__select');
    const result = document.querySelector('.productsgallery__options');
    const h3 = document.querySelector('.productsgallery__h2');
    const productsrow = document.querySelector('.products__options');

    if(select&&input&&result&&h3){
      select.addEventListener('submit', function(e){
        e.preventDefault();
        result.textContent = " ";
        h3.innerText = " ";
        const collections = input.value;
        data[collections].forEach(function(item){
          const createdelement = {
            p: document.createElement('p'),
            h3: document.createElement('h3'),
            img: document.createElement('img'),
            div: document.createElement('div')
          };
          h3.innerText = item.collection;
          createdelement.p.classList.add('paragraph');      
          createdelement.h3.classList.add('overtitle');
          createdelement.div.classList.add('cell');
          
          createdelement.div.classList.add('products__option');
          createdelement.div.appendChild(createdelement.img);
          createdelement.div.appendChild(createdelement.p);
          createdelement.div.appendChild(createdelement.h3);
          createdelement.p.innerText = item.name;
          createdelement.img.src = item.imgset;
          createdelement.h3.innerText = item.priceM +"€";
          createdelement.img.classList.add('products__img');
          result.classList.add('products__options')
          result.appendChild(createdelement.div);
          createdelement.div.addEventListener('click', function(product){
            window.location.href = "/assets/pages/set.html"
            localStorage.setItem('name',JSON.stringify(item));
          });
        });
      });
    }
    data.summershine.forEach(function(item){
      if(productsrow){

      
      const createdelement = {
            p: document.createElement('p'),
            h3: document.createElement('h3'),
            img: document.createElement('img'),
            div: document.createElement('div')
          };
          createdelement.p.classList.add('paragraph');      
          createdelement.h3.classList.add('overtitle');
          createdelement.div.classList.add('cell');
          createdelement.div.classList.add('products__option');
          createdelement.div.appendChild(createdelement.img);
          createdelement.div.appendChild(createdelement.p);
          createdelement.div.appendChild(createdelement.h3);
          createdelement.p.innerText = item.name;
          createdelement.img.src = item.imgset;
          createdelement.h3.innerText = item.priceM +"€";
          createdelement.img.classList.add('products__img');
          productsrow.appendChild(createdelement.div);
          createdelement.div.addEventListener('click', function(product){
            window.location.href = "/assets/pages/set.html"
            localStorage.setItem('name',JSON.stringify(item));
          });
      }    
    })


    //pages produit individuel
    
    const set = JSON.parse(localStorage.getItem('name'));
    const title = document.querySelector('.set__name');
    const priceset = document.querySelector('.set__price');
    const collection = document.querySelector('.set__collection');
    const quantity = document.querySelector('set__quantity');
    const slides = document.querySelectorAll('.set__slide'); 
    const slide1 = document.querySelector('.set__slide--1');
    const slide2 = document.querySelector('.set__slide--2');
    const slide3 = document.querySelector('.set__slide--3');
    let slideIndex = 0;
    const prev = document.querySelector('.set__prev');
    const next = document.querySelector('.set__next');
    if(title&&priceset&&collection&&slides&&slide1&&slide2&&slide3&&prev&&next){
      title.innerText = set.name
      priceset.innerText = set.priceM +"€"
      collection.innerText = set.collection
    
      //slider
      const productimf = document.createElement('img');
      productimf.src = set.imgmodel
      
      slide1.src = set.imgset;
      slide2.src = set.imghover;
      slide3.src = set.imgmodel;
    
      initSlider();
    
      function initSlider(){
        slides[slideIndex].classList.add('show');
      }
      prev.addEventListener('click', function(){
        prevSlide();
      });
      next.addEventListener('click', function(){
        nextslide();
      });
      function showSlide(index){
        if( index >= slides.length){
          slideIndex = 0;
        }else if(index < 0){
          slideIndex = slides.length -1;
        }
        slides.forEach(slide => {
          slide.classList.remove('show');
        });
        slides[slideIndex].classList.add('show');
      }
      function prevSlide(){
        slideIndex--;
        showSlide(slideIndex)
      }
    
      function nextslide(){
        slideIndex++;
        showSlide(slideIndex);
      }
    }
    
    //ajouts formes
    data.molds.forEach(function(item){
      if(shapesrow){
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
        });
      }
    });
    //changement tailles
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
        addMold(shapestate[currentsize]);  
      });
    });
    //couleur base
    data.base.forEach(function(item){
        basecolor = item
    })
    data.colors.forEach(function(item){
      if(basecolorrow){
        const coloricon = document.createElement('img');
        coloricon.src = item.img;
        coloricon.classList.add('color');
        basecolorrow.appendChild(coloricon);
        coloricon.addEventListener('click' ,function(){
          if(currentmold){
            colorstate = item.name
            addBasecolor(basecolor[colorstate]);
          }
        });
      }
    });
    //ajouts nailart
    data.nailart.forEach(function(item){
      if(nailartrow){
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
          if(currentmold){
            nailartstate = item;
            addNailart(item.white)
          }
        });
      }
    });
    //couleurs nailart
    data.colors.forEach(function(item){
      if(nailartcolorrow){
        const coloricon = document.createElement('img');
        coloricon.src = item.img;
        coloricon.classList.add('color');
        nailartcolorrow.appendChild(coloricon);
        coloricon.addEventListener('click' ,function(){
          colorstate = item.name
          addNailart(nailartstate[colorstate]);
        });
      }
    });
    //decos2d  
    data.decos2d.forEach(function(item){
      if(deco2drow){
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
          decostate = item;
        });   
      }       
    });
    //decos3d
    data.decos3d.forEach(function(item){
      if(deco3drow){
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
          decostate = item;
        });   
      } 
    });
    //couleurs decos
    data.colors.forEach(function(item){
      if(decocolorrow){
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
      }
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
    canvas.bringForward(img);
    canvas.viewportCenterObject(img);

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
    canvas.viewportCenterObject(img);

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
    canvas.viewportCenterObject(img);

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
function resize () {
  const canvasbox = document.querySelector('.canvas_box')
  const canvasHeight = 525;
  const canvasWidth = 900;
  if(canvasbox&&canvasHeight&&canvasWidth){
    const width = canvasbox.clientWidth;
    const ratio = canvasWidth / canvasHeight; 

    const scale = width / canvasWidth;

    canvas.setDimensions({
      width: width,
      height: width / ratio
    });

    canvas.setZoom(scale);
    canvas.renderAll();

  }
  
}


window.addEventListener('resize', resize);
resize();
//pages produits commandes
