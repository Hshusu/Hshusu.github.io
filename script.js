//target all elements to save to constants
const page1btn = document.querySelector("#page1btn");
const page2btn = document.querySelector("#page2btn");
const page3btn = document.querySelector("#page3btn");
var allpages = document.querySelectorAll(".page");

const card1 = document.querySelector("#card1");
const card2 = document.querySelector("#card2");
const card3 = document.querySelector("#card3");
const card4 = document.querySelector("#card4");
const card5 = document.querySelector("#card5");
const card6 = document.querySelector("#card6");
const card7 = document.querySelector("#card7");
const card8 = document.querySelector("#card8");
var allcards = document.querySelectorAll(".white-box");

//select all subtopic pages
console.log(allpages);
hideall();
show(1);

function hideall() { //function to hide all pages
	for (let onepage of allpages) { //go through all subtopic pages
		onepage.style.display = "none"; //hide it

	}
}

function show(pgno) { //function to show selected page no
	console.log("clicked");
	hideall();
	//select the page based on the parameter passed in
	let onepage = document.querySelector("#page" + pgno);
	//show the page
	onepage.style.display = "block";
}
/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function*/
page1btn.addEventListener("click", function() {
	show(1);
});
page2btn.addEventListener("click", function() {
	show(2);
});
page3btn.addEventListener("click", function() {
	show(3);
});
/*JS for hamMenu */
const hamBtn = document.querySelector("#hamIcon");
hamBtn.addEventListener("click", toggleMenus);
const menuItemsList = document.querySelector("nav ul");

function toggleMenus() {
	console.log("clicked");
	menuItemsList.classList.toggle("menuHide");

	if (menuItemsList.classList.contains("menuHide")) {

		myMovemenu(menuItemsList, -30);
	}
}
window.addEventListener('resize', function() {
	if (window.matchMedia("(min-width: 801px)").matches) {
		menuItemsList.classList.remove("menuHide");
	}
});

//for menu moving anim
function myMovemenu(elementid, x) {
	let id = null;
	let pos = -300;
	let opacity = 0;
	menuItemsList.style.opacity = opacity;
	menuItemsList.style.left = pos;
	clearInterval(id);
	id = setInterval(frame, 10);

	function frame() {
		if (pos >= x) {
			menuItemsList.style.left = x;
			menuItemsList.style.opacity = 100;
			clearInterval(id);
		} else {
			pos += 10;
			menuItemsList.style.left = pos + "px";
			opacity += 0.05;
			menuItemsList.style.opacity = opacity;
		}
	}

}
//canvas minigame


card1.addEventListener("click", function() {
	flipcard(1);
	console.log(1);
});
card2.addEventListener("click", function() {
	flipcard(2);
});
card3.addEventListener("click", function() {
	flipcard(3);
});
card4.addEventListener("click", function() {
	flipcard(4);
});
card5.addEventListener("click", function() {
	flipcard(5);
});
card6.addEventListener("click", function() {
	flipcard(6);
});
card7.addEventListener("click", function() {
	flipcard(7);
});
card8.addEventListener("click", function() {
	flipcard(8);
});


function hideallcards() { //function to hide all pages
	for (let onecard of allcards) { //go through all subtopic pages
		onecard.classList.remove("flip"); //hide it

	}
}
var othercard = null;

//handles flipping and matching
function flipcard(cardno) { //function to hide all pages

	let onecard = document.querySelector("#card" + cardno);
	onecard.classList.add("flip");
	if (othercard == null) {
		othercard = cardno;
	} else {
		if ((cardno == othercard - 4) || (cardno == othercard + 4)) {
			let carrdds = document.querySelectorAll(".flip");
			for (let cards2 of carrdds) { //go through all subtopic pages

				cards2.classList.add("flipdone");
				cards2.classList.remove("flip");
			}
			othercard = null;
		} else {
			othercard = null;
			setTimeout(function() {
				hideallcards();
			}, 1000);


		}
	}

}




//holds food data
class Food {
	constructor(description, calories, imgSource) {
		this.description = description;
		this.calories = calories;
		this.imgSource = imgSource;
	}

}


let foodArray = [];


// create some Food objects and add them to the array

foodArray.push(new Food("Big Mac from mcdonalds | Calories : 257", 257, "images/5882482de81acb96424ffaac.png"));

foodArray.push(new Food("Chicken biryani  | Calories : 1000", 1000, "images/chicken-biryani-featured-1.jpg"));

foodArray.push(new Food("fried rice | Calories : 163", 163, "images/friedrice.webp"));

foodArray.push(new Food("shoyu ramen | Calories : 700", 700, "images/Spicy-Shoyu-Ramen-8055-I-500x375.jpg"));

const mincal = document.querySelector("#mincal");
const maxcal = document.querySelector("#maxcal");

// listeners when fields change
const inputColl = document.querySelectorAll("#left input"); //todo
for (let item of inputColl) { // loop each item
	item.addEventListener("change", doCalculate);
}

function removelist() {
	const inputColl = document.querySelectorAll("#listitm");
	for (let itm of inputColl) {
		itm.remove();
	}
}
// add food to foodlist
function addFoodToDiv(food) {

	let div = document.getElementById("foodlist");

	let html = `

    <div class="flex-item fleximage fadein faderight" id="listitm">

      <img src="${food.imgSource}" width="450" height="300" alt="handsom dude">

    </div>

    <div class="flex-item tbox fadein fadeleft" id="listitm">

      ${food.description}

    </div>

  `;

	div.innerHTML += html;

}
actival();

function actival() {
	for (let itm of foodArray) {

		addFoodToDiv(itm);

	}
}

//calc which items fit cals
function doCalculate() {
	removelist();
	if (mincal > maxcal) {

		return;
	}

	for (let itm of foodArray) {
		if (itm.calories > mincal.value && itm.calories < maxcal.value) {
			addFoodToDiv(itm);
		}
	}
	reloadfaders();
}


let options = {
	threshold: 0.5,
	rootmargin: "0px,0px,0px,-10px"
};
var faders = document.querySelectorAll(".fadein");
var scrollappear = new IntersectionObserver(
	function(entries) {
		entries.forEach(entry => {

			if (!entry.isIntersecting) {
				entry.target.classList.remove("appear");
			} else {

				entry.target.classList.add("appear");

			}
		});
	},
	options

);
faders.forEach(fader => {
	scrollappear.observe(fader);

});
//for loading the fade anims
function reloadfaders() {
	faders = document.querySelectorAll(".fadein");
	var scrollappear = new IntersectionObserver(
		function(entries) {
			entries.forEach(entry => {

				if (!entry.isIntersecting) {
					entry.target.classList.remove("appear");
				} else {

					entry.target.classList.add("appear");

				}
			});
		},
		options

	);
	faders.forEach(fader => {
		scrollappear.observe(fader);

	});
}





//for mouse effects
let start = new Date().getTime();

const originPosition = {
	x: 0,
	y: 0
};

const last = {
	Timestamp: start,
	Pos: originPosition,
	mousePosition: originPosition
};

const config = {
	AnimDuration: 1500,
	minimumTime: 100,
	minimumDistance: 75,
	glowDuration: 75,
	maximumGlowPointSpacing: 10,
	colors: ["#c73333", "#white"],
	sizes: ["3.4rem", "2rem", "1.6rem"],
	animations: ["part1", "part2", "part3"]
};

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
};

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
};

const createGlowPoint = position => {
	const glow = document.createElement("div");

	glow.className = "glow-point";

	glow.style.left = px(position.x);
	glow.style.top = px(position.y);

	appendElement(glow);

	removeElement(glow, config.glowDuration);
};

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

		createGlowPoint({
			x, y
		});
	});
};

const updateLastparticle = position => {
	last.Timestamp = new Date().getTime();

	last.Pos = position;
};

const updateLastMousePosition = position => last.mousePosition = position;

const adjustLastMousePosition = position => {
	if (last.mousePosition.x === 0 && last.mousePosition.y === 0) {
		last.mousePosition = position;
	}
};

const handleOnMove = e => {
	const mousePosition = {
		x: e.clientX,
		y: e.clientY + document.documentElement.scrollTop
	};

	adjustLastMousePosition(mousePosition);

	const now = new Date().getTime(),
		hasMovedFarEnough = calcDistance(last.Pos, mousePosition) >= config.minimumDistance,
		hasBeenLongEnough = calcElapsedTime(last.Timestamp, now) > config.minimumTime;

	if (hasMovedFarEnough || hasBeenLongEnough) {
		createparticle(mousePosition);

		updateLastparticle(mousePosition);
	}

	createGlow(last.mousePosition, mousePosition);

	updateLastMousePosition(mousePosition);
};

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);

document.body.onmouseleave = () => updateLastMousePosition(originPosition);