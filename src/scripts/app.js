import { fabric } from "fabric";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

//Animation étoile
gsap.to('.tutorial__nailfile',{
  x: 15,
  y: -10,
  duration: 0.3,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut"
});
gsap.to('.tutorial__glue',{
  
  y: 15,
  duration: 1,
  repeat: -1,
  yoyo: true,
})

gsap.to('.tutorial__nail',{
  
  y: -30,
  rotate: 10,
  duration: 1,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut"
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
  gsap.to('.aboutus__stars', {
    yPercent: 10,
    scrollTrigger : {
      trigger: '.products',
      start: 'bottom center',
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
  gsap.to('.aboutus__star', {
    yPercent: -40,
    scrollTrigger : {
      trigger: '.aboutus',
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
//panier
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
const opencart = document.querySelector('.landing__icon--cart');
const cartsection = document.querySelector('.cart');
const cartexit = document.querySelector('.cart__exit');
let total = 0;
const price = document.querySelector('.custom__price');
opencart.addEventListener('click', function( ){
  openCart();
})
cartexit.addEventListener('click', function(){
  closeCart();
})

function openCart(){
  cartsection.classList.add('active');
}
function closeCart(){
  cartsection.classList.remove('active');
}
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
    canvas.renderAll();
  });
  clearbtn.addEventListener('click', function(){
    let canvasobj = canvas.getObjects();
    canvasobj.forEach((obj)=>{
      canvas.remove(obj);
      canvas.renderAll();
    })
  });
  backward.addEventListener('click', function(){
    let obj = canvas.getActiveObject();
    canvas.sendBackwards(obj);
    canvas.renderAll();
  });
  forward.addEventListener('click', function(){
    let obj = canvas.getActiveObject();
    canvas.bringToFront(obj);
    canvas.renderAll();
  });
}

//étapes customisation
const steps = document.querySelectorAll(".custom__step");
const pages = document.querySelectorAll('.custom__page');
let currentStep = null

if(steps&&pages){
  steps.forEach((step, index) => {
    if(index === 0){
      pages[index].classList.remove('hidden');
    }else{
      pages[index].classList.add('hidden');  
    }
    step.addEventListener('click', function(btn){
      currentStep = step.className;
      steps.forEach(function(step){
        step.classList.remove('selected');
      });
      pages.forEach(function(page){
      page.classList.add('hidden');

      if(currentStep !== 'custom__step custom__step--nailart'){
        if(currentnailart){
          currentnailart.selectable = false;
        }
      }
      if(currentStep == 'custom__step custom__step--nailart'){
        if(currentnailart){
          currentnailart.selectable = true;
        }
      }
    });
    pages[index].classList.remove('hidden');
    steps[index].classList.add('selected');
    });
  });
};

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

    //tout les produits
    const select = document.querySelector('.productsgallery__filter');
    const input = document.querySelector('.productsgallery__select');
    const result = document.querySelector('.productsgallery__options');
    const h3 = document.querySelector('.productsgallery__h2');
    const productsrow = document.querySelector('.products__options');
    const tc = [];
    const ll = [];
    const s = [];
    const sf = [];
    const cm = [];
    const col = [];
    if(result){
      data.produits.forEach(function(item){
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
          result.classList.add('products__options');
          result.appendChild(createdelement.div);
          createdelement.div.addEventListener('click', function(product){
            window.location.href = "/assets/pages/set.html"
            localStorage.setItem('name',JSON.stringify(item));
          });

          if(item.collection == "Timeless Classics"){
            tc.push(item)
          }
          else if(item.collection == "Loud Luxury"){
            ll.push(item)
          }
          else if(item.collection == "Summershine"){
            s.push(item)
          }
          else if(item.collection == "Spring Floral"){
            sf.push(item)
          }
          else if(item.collection == "Chrome Madness"){
            cm.push(item)
          }
          
      });
      col.push(tc, ll, s, sf, cm)
    }
    
    //filtrer les produits
    if(select&&input&&result&&h3){
      select.addEventListener('submit', function(e){
        e.preventDefault();
        result.innerHTML = " ";
        h3.innerText = " ";
        const collections = input.value;
        console.log(collections)
        col[input.value].forEach(function(item){
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
    const addtocart = document.querySelector('.set__btn--cart');
    const buynow = document.querySelector('.set__btn--buy');
    const cartproducts = document.querySelector('.cart__products')
    let slideIndex = 0;
    const prev = document.querySelector('.set__prev');
    const next = document.querySelector('.set__next');
    
    const checkoutproducts = document.querySelector('.checkout__products');
    if(title&&priceset&&collection&&slides&&slide1&&slide2&&slide3&&prev&&next&&addtocart&&buynow&&cartproducts){
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
      //ajouter au panier et update le panier
      
      addtocart.addEventListener('click', function(){
        cartItems.push(set);
        localStorage.setItem('cart', JSON.stringify(cartItems));
        openCart();
        updateCart();
        addtocart.innerText = "Ajouté";
        addtocart.classList.add('btn__unclickable');
      });
      function updateCart(){
        cartproducts.textContent = " ";
        const cart = JSON.parse(localStorage.getItem('cart'));
        cart.forEach(function(item){
          const cartdiv = document.createElement('div');
          const cartdivimg = document.createElement('img');
          const cartdivtext = document.createElement('div');
          const cartname = document.createElement('p');
          const cartprice = document.createElement('h3');
          cartname.innerText = item.name
          cartprice.innerText = item.priceM+"€"
          cartdivimg.src = item.imgset
          cartprice.classList.add('cart__price');
          cartname.classList.add('cart__name');
          cartdiv.classList.add('cart__product');
          cartdivimg.classList.add('cart__img');
          cartdivtext.classList.add('cart__text');
          cartdivtext.appendChild(cartname);
          cartdivtext.appendChild(cartprice);
          cartdiv.appendChild(cartdivimg);
          cartdiv.appendChild(cartdivtext);
          cartproducts.appendChild(cartdiv);
        });
      };
    }
    const customnext = document.querySelector('.custom__next');
    let canvasimg = null
    if(customnext){
      customnext.addEventListener('click', function(){
      const myset = {
        imgset : canvas.toDataURL({format: "png"}),
        name : "Mon set",
        priceM : total
      };
      localStorage.setItem('name', JSON.stringify(myset))
      window.location.href = "/assets/pages/set.html"
    });
    
    
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
          if(!currentmold){
            total+=item.price
          }
          //prix custom
          price.innerText = total+"€"

        });
      }
    });
    //changement tailles
    sizes.forEach(function(size){
      size.addEventListener('click', function(){
        if(size.classList.contains('custom__size--xs')){
          currentsize = "xs";
          if(currentnailart){
            currentnailart.set({
              top : -25
            });
          }
        }else if(size.classList.contains('custom__size--s')){
          currentsize = "s";
          if(currentnailart){
            currentnailart.set({
              top : -12
            });
          }
        }else if(size.classList.contains('custom__size--m')){
          currentsize = "m";
          if(currentnailart){
            currentnailart.set({
              top : 0
            });
          }
        }else if(size.classList.contains('custom__size--l')){
          currentsize = "l";
          if(currentnailart){
            currentnailart.set({
              top : 25
            });
          }
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
          if(!currentbase){
            total+=basecolor.price
            price.innerText = total+"€"
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
            addNailart(item.white);
            if(!currentnailart){
              total+=nailartstate.price
              price.innerText = total+"€"
            }
            
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
          if(currentmold){
            colorstate = item.name
            addNailart(nailartstate[colorstate]);
          }
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
          total+=decostate.price
          price.innerText = total+"€"
          
        });
      }
    });
    //layer management
  });

function addMold(url){
  fabric.Image.fromURL( url , function(img){
    img.set({
      "selectable": false,
      "eventable": false
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
    img.scaleToHeight(500);
    img.scaleToWidth(500);

    canvas.add(img);
    if(currentbase){
      canvas.moveTo(img, 1);
    }else{
      canvas.sendBackwards(img);
    }
    
    canvas.viewportCenterObject(img);

    currentnailart = img;
    
    if(currentsize == "xs"){
      currentnailart.set({
      top : -25
      })
    }
    if(currentsize == "s"){
      currentnailart.set({
      top : -12
      })
    }else if(currentsize == "m"){
      currentnailart.set({
      top : 0
      })
    }else if(currentsize == "l"){
      currentnailart.set({
      top : 25
      })
    }
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
        if(currentnailart){
          canvas.moveTo(img, 2);
        }else if(!currentnailart){
          canvas.sendBackwards(img);
        }
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
//Commander son propre set
