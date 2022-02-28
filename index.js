// function randomColor() {
// 	let color = [];
// 	for (let i = 0; i < 3; i++) {
// 	  color.push(Math.floor(Math.random() * 256));
// 	}
// 	return 'rgb(' + color.join(', ') + ')';
//   }

//   document.addEventListener("mouseover", function(){
// 	document.body.style.backgroundColor = randomColor();
//   });

//   document.querySelectorAll('a').addEventListener('mouseover', event => {
// 		event.target.style.fill = randomColor();
//   });

// canvas1

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
let span = document.querySelectorAll(".blast");
let h1 = document.querySelector("h1");
const header = document.querySelector(".header");
const scroll = document.querySelector("scroll-down");
const square = document.querySelector(".square");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];
let hue = 0;

window.addEventListener("resize", function () {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

const mouse = {
	x: undefined,
	y: undefined,
};

canvas.addEventListener("click", (event) => {
	mouse.x = event.x;
	mouse.y = event.y;
	for (let i = 0; i < 10; i++) {
		particlesArray.push(new Particle());
	}

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// ctx.clearRect(0, 0, canvas.width, canvas.height);
});

canvas.addEventListener("mousemove", (event) => {
	mouse.x = event.x;
	mouse.y = event.y;
	for (let i = 0; i < 2; i++) {
		particlesArray.push(new Particle());
	}
});

class Particle {
	constructor() {
		this.x = mouse.x;
		this.y = mouse.y;
		this.size = Math.random() * 16;
		this.speedX = Math.random() * 3 - 1.5;
		this.speedY = Math.random() * 3 - 1.5;
		this.color = "hsl(" + hue + ", 100%, 50%)";
	}
	update() {
		this.x += this.speedX;
		this.y += this.speedY;
		if (this.size > 0.2) this.size -= 0.1;
	}

	draw() {
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.fill();
	}
}

function handleParticles() {
	for (let i = 0; i < particlesArray.length; i++) {
		particlesArray[i].update();
		particlesArray[i].draw();

		for (let j = i; j < particlesArray.length; j++) {
			const dx = particlesArray[i].x - particlesArray[j].x;
			const dy = particlesArray[i].y - particlesArray[j].y;
			const distance = Math.sqrt(dx * dx + dy * dy);

			if (distance < 100) {
				ctx.beginPath();
				ctx.strokeStyle = particlesArray[i].color;
				ctx.lineWidth = particlesArray[i].size / 30;
				ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
				ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
				ctx.stroke();
			}
		}
		if (particlesArray[i].size <= 0.3) {
			particlesArray.splice(i, 1);
			i--;
		}
	}
}

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// ctx.fillStyle = 'rgba(0,0,0,0.1)'
	// ctx.fillRect(0,0,canvas.width, canvas.height)
	hue += 15;
	handleParticles();
	requestAnimationFrame(animate);
}

animate();

// horizontal scroll
TweenLite.defaultEase = Linear.easeNone;
const content = document.querySelectorAll(".content-scroll");
const controller = new ScrollMagic.Controller();
const aside = document.querySelector(".aside");
const t1 = new TimelineMax();

t1.to("#js-slideContainer", 0.5, { xPercent: 0 });
t1.from(content[0], 0.5, { opacity: 0, scale: 2.5 });

t1.to("#js-slideContainer", 0.5, { xPercent: -20 });
t1.from(content[1], 0.5, { opacity: 0, scale: 2.5 });
t1.to("#js-slideContainer", 0.5, { xPercent: -40 });
t1.from(content[2], 0.5, { opacity: 0, scale: 2.5, left: 400, top: 400 });
t1.to("#js-slideContainer", 0.5, { xPercent: -60 });
t1.from(content[3], 0.5, {
	opacity: 0,
	scale: 2.5,
	right: 400,
	bottom: 400,
	rotation: -27,
});
t1.to("#js-slideContainer", 0.5, { xPercent: -80 });
t1.from(content[4], 0.5, { opacity: 0, scale: 2.5, rotation: 27 });

gsap.registerPlugin(ScrollTrigger);
let t2 = gsap.timeline({
	scrollTrigger: {
		trigger: content[1],
		start: "top 100%",
		scrub: 1,
	},
});

t2.to(".aside, #sound, .btns-container", { opacity: 0 });

let t3 = gsap.timeline({
	scrollTrigger: {
		trigger: "#section-blog",
		start: "top",
		scrub: 1,
	},
});

t3.to(".aside, #sound, .btns-container", { opacity: 1 });

new ScrollMagic.Scene({
	triggerElement: "#js-wrapper",
	triggerHook: "onLeave",
	duration: "300%",
})
	.setPin("#js-wrapper")
	.setTween(t1)
	// .addIndicators({
	// 	colorTrigger: "White",
	// 	colorStart: "black",
	// 	colorEnd: "red",
	// })
	.addTo(controller);

const soundCloud = document.querySelector(".sound-cloud");
const off = document.querySelector("#off");
const on = document.querySelector("#on");
const myAudio = document.querySelector("#myAudio");

off.addEventListener("click", () => soundTrack("off"));
on.addEventListener("click", () => soundTrack("on"));

const soundTrack = (soundState) => {
	if (soundState === "off") {
		on.style.display = "block";
		off.style.display = "none";
		soundCloud.style.color = "#08fdd8";
		myAudio.play();
	} else if (soundState === "on") {
		on.style.display = "none";
		off.style.display = "block";
		soundCloud.style.color = "#f50057";
		myAudio.pause();
	}
};

// Play music functionality

const btnBars = document.querySelector(".bars");
const btnTimes = document.querySelector(".times");
const SideNav = document.querySelector(".aside");

btnBars.addEventListener("click", () => myFunc("open"));
btnTimes.addEventListener("click", () => myFunc("close"));

const myFunc = (navCondition) => {
	if (navCondition === "open") {
		SideNav.classList.add("show-nav");
		btnTimes.style.display = "block";
		btnBars.style.display = "none";
	} else if (navCondition === "close") {
		SideNav.classList.remove("show-nav");
		btnTimes.style.display = "none";
		btnBars.style.display = "block";
	}
};

// Animate letters in hero
$("h1").blast({
	delimiter: "character",
	customClass: "alpha small",
});

anime.timeline({ loop: false }).add({
	targets: ".alpha",
	scale: [2, 1],
	opacity: [0, 1],
	delay: function (element, i) {
		return i * 100;
	},
});

const elements = document.getElementsByClassName("alpha");

for (let i = 0; i <= elements.length; i++) {
	elements[i].addEventListener("animationend", function (e) {
		elements[i].classList.remove("animated");
	});

	elements[i].addEventListener("mouseover", function (e) {
		elements[i].classList.add("animated");
	});
}
