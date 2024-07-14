//target all elements to save to constants
const page1btn=document.querySelector("#page1btn");
const page2btn=document.querySelector("#page2btn");
const page3btn=document.querySelector("#page3btn");
var allpages=document.querySelectorAll(".page");
//select all subtopic pages
console.log(allpages);
hideall();
show(1);
function hideall(){ //function to hide all pages
for(let onepage of allpages){ //go through all subtopic pages
onepage.style.display="none"; //hide it

}
}

function show(pgno){ //function to show selected page no
console.log("clicked");
hideall();
//select the page based on the parameter passed in
let onepage=document.querySelector("#page"+pgno);
//show the page
onepage.style.display="block";
}
/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function*/
page1btn.addEventListener("click", function () {
show(1);
});
page2btn.addEventListener("click", function () {
show(2);
});
page3btn.addEventListener("click", function () {
show(3);
});
/*JS for hamMenu */
const hamBtn =document.querySelector("#hamIcon");
hamBtn.addEventListener("click",toggleMenus);
const menuItemsList=document.querySelector("nav ul");
function toggleMenus(){ 
    console.log("clicked");
menuItemsList.classList.toggle("menuHide");

if(menuItemsList.classList.contains("menuHide")){ 
    
    myMovemenu(menuItemsList,-30)
}
}
window.addEventListener('resize', e => {
    if (window.matchMedia(`(min-width: 801px)`).matches) {
        menuItemsList.classList.remove("menuHide");
    }
 });
function myMovemenu(elementid, x) {
    let id = null;
    let iid = null;
    let pos = -300;
    let opacity = 0;
    menuItemsList.style.opacity = opacity
    menuItemsList.style.left =pos; 
    clearInterval(id);
    id = setInterval(frame, 10);
    function frame() {
      if (pos >= x) {
        menuItemsList.style.left =x; 
        menuItemsList.style.opacity = 100
        clearInterval(id);
      } else {
        pos+=20; 
        menuItemsList.style.left = pos + "px"; 
        opacity+=0.05; 
        menuItemsList.style.opacity = opacity
      }
    }

  }
 
//gotta fix this shit
// recipe calc
  // fields
  const bill = document.querySelector("#bill");
  const numPeople = document.querySelector("#numPeople");
  const tip =  document.querySelector("#tip");
  
  // elements
  const amt = document.querySelector("#amt");
  const ttp = document.querySelector("#ttp");
  const app =  document.querySelector("#app");
    
  // listeners when fields change
  const inputColl = document.querySelectorAll("#left input"); //todo
  for (let item of inputColl) { // loop each item
    item.addEventListener("change", doCalculate);
  }
  
  // 
  function doCalculate() {
    let totalTips = (1.0 * bill.value) * (1.0 * tip.value) * 0.01;
    let totalAmount =((1.0 * bill.value) + (1.0 * totalTips));
    let amountPerPerson = totalAmount/(numPeople.value)
    
    amt.innerHTML = totalAmount;
    ttp.innerHTML = totalTips;
    app.innerHTML = amountPerPerson;
  }

  //scrollable text

  let options = {
    threshold: 0.5,
    rootmargin: "0px,0px,0px,-10px"
  };
  const faders = document.querySelectorAll(".fadein")
  const scrollappear = new IntersectionObserver(
    function(entries, scrollappear){
      entries.forEach(entry =>{

        if(!entry.isIntersecting){
          entry.target.classList.remove("appear");
        }
        else{

          entry.target.classList.add("appear");

        }
      }
    )},
    options

  )
  faders.forEach(fader =>{
    scrollappear.observe(fader);
  });







  //for mouse effects
  let start = new Date().getTime();

const originPosition = { x: 0, y: 0 };

const last = {
  Timestamp: start,
  Pos: originPosition,
  mousePosition: originPosition
}

const config = {
  AnimDuration: 1500,
  minimumTime: 100,
  minimumDistance: 75,
  glowDuration: 75,
  maximumGlowPointSpacing: 10,
  colors: ["#c73333", "#white"],
  sizes: ["3.4rem", "2rem", "1.6rem"],
  animations: ["part1", "part2", "part3"]
}

let count = 0;
  
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
      selectRandom = items => items[rand(0, items.length - 1)];

const withUnit = (value, unit) => `${value}${unit}`,
      px = value => withUnit(value, "px"),
      ms = value => withUnit(value, "ms");

const calcDistance = (a, b) => {
  const diffX = b.x - a.x,
        diffY = b.y - a.y;
  
  return Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
}

const calcElapsedTime = (start, end) => end - start;

const appendElement = element => document.body.appendChild(element),
      removeElement = (element, delay) => setTimeout(() => document.body.removeChild(element), delay);

const createparticle = position => {
  const particle = document.createElement("span"),
        color = selectRandom(config.colors);
  
        particle.className = "material-icons";
        particle.appendChild(document.createTextNode("+"));
        particle.style.left = px(position.x);
        particle.style.top = px(position.y);
        particle.style.fontSize = selectRandom(config.sizes);
        particle.style.color = color;
        particle.style.textShadow = `0px 0px 1.5rem rgb(${color} / 0.5)`;
        particle.style.animationName = config.animations[count++ % 3];
        particle.style.AnimDuration = ms(config.AnimDuration);
  
  appendElement(particle);

  removeElement(particle, config.AnimDuration);
}

const createGlowPoint = position => {
  const glow = document.createElement("div");
  
  glow.className = "glow-point";
  
  glow.style.left = px(position.x);
  glow.style.top = px(position.y);
  
  appendElement(glow)
  
  removeElement(glow, config.glowDuration);
}

const determinePointQuantity = distance => Math.max(
  Math.floor(distance / config.maximumGlowPointSpacing),
  1
);

//code for glow
const createGlow = (last, current) => {
  const distance = calcDistance(last, current),
        quantity = determinePointQuantity(distance);
  
  const dx = (current.x - last.x) / quantity,
        dy = (current.y - last.y) / quantity;
  
  Array.from(Array(quantity)).forEach((_, index) => { 
    const x = last.x + dx * index, 
          y = last.y + dy * index;
    
    createGlowPoint({ x, y });
  });
}

const updateLastparticle = position => {
  last.Timestamp = new Date().getTime();

  last.Pos = position;
}

const updateLastMousePosition = position => last.mousePosition = position;

const adjustLastMousePosition = position => {
  if(last.mousePosition.x === 0 && last.mousePosition.y === 0) {
    last.mousePosition = position;
  }
};

const handleOnMove = e => {
  const mousePosition = { x: e.clientX, y: e.clientY +document.documentElement.scrollTop}
  
  adjustLastMousePosition(mousePosition);
  
  const now = new Date().getTime(),
        hasMovedFarEnough = calcDistance(last.Pos, mousePosition) >= config.minimumDistance,
        hasBeenLongEnough = calcElapsedTime(last.Timestamp, now) > config.minimumTime;
  
  if(hasMovedFarEnough || hasBeenLongEnough) {
    createparticle(mousePosition);
    
    updateLastparticle(mousePosition);
  }
  
  createGlow(last.mousePosition, mousePosition);
  
  updateLastMousePosition(mousePosition);
}

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);

document.body.onmouseleave = () => updateLastMousePosition(originPosition);