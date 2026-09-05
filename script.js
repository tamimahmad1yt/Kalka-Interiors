const toggle = document.querySelector(".menu-toggle");
const links = document.querySelector(".nav-links");
toggle.addEventListener("click", () => {
  links.classList.toggle("open");
});
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => links.classList.remove("open"));
});
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
function showSlide(index) {
    if (index >= slides.length) {currentSlide = 0;}
    else if (index < 0) {currentSlide = slides.length - 1;}
    else {currentSlide = index;}
    slides.forEach((slide) => {slide.classList.remove("active");});
    dots.forEach((dot) => {dot.classList.remove("active");});
    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
}
function changeSlide(direction) {
    showSlide(currentSlide + direction);
}
let slideshow = setInterval(() => {
    changeSlide(1);
}, 5000);
document
    .querySelectorAll(".slider-button, .dot")
    .forEach((button) => {
        button.addEventListener("click", () => {
            clearInterval(slideshow);
            slideshow = setInterval(() => {
                changeSlide(1);
            }, 5000);

        });

    });

const consultationForm = document.getElementById("consultationForm");

if (consultationForm) {

    consultationForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const city = document.getElementById("city").value.trim();

        const whatsappCheckbox = document.getElementById("whatsapp");

        const whatsappUpdates =
            whatsappCheckbox && whatsappCheckbox.checked
                ? "Yes"
                : "No";

        if (!/^[0-9]{10}$/.test(phone)) {

            alert("Please enter a valid 10-digit phone number.");
            return;
        }
const googleSheetURL ="https://script.google.com/macros/s/AKfycbzMszGrnz6nhUq7dYH4dltEnlzWZGOIVCJnkHLQG0ma4PCKbRAPomPxmjUN0zOt3Csl/exec";
const formData = {
    name: name,
    email: email,
    phone: phone,
    city: city,
    whatsappUpdates: whatsappUpdates
};
try {
    await fetch(googleSheetURL, {
        method: "POST",
        headers: {
            "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(formData)
    });
    console.log("Data sent to Google Sheets successfully.");
} catch (error) {
    console.error("Google Sheets Error:", error);

}
        const whatsappNumber = "918810690130";

        const message = `Hello Kalka Interiors! 👋

I would like to get a FREE CONSULTATION.

Name: ${name}
Email: ${email}
Phone: +91 ${phone}
City: ${city}`;

        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, "_blank");
        consultationForm.reset();
    });

}
const designPrices={Essential:1000,Premium:1500,Luxury:2000};
let selectedLevel='Premium';
const areaSlider=document.getElementById('areaSlider');
const areaValue=document.getElementById('areaValue');
const pricePerSqFt=document.getElementById('pricePerSqFt');
const totalPrice=document.getElementById('totalPrice');
const levelButtons=document.querySelectorAll('.level-select-button');
function formatIndianNumber(n){return new Intl.NumberFormat('en-IN').format(n)}
function updateCalculator(){if(!areaSlider)return;const area=Number(areaSlider.value),rate=designPrices[selectedLevel],total=area*rate;areaValue.textContent=formatIndianNumber(area);pricePerSqFt.textContent=formatIndianNumber(rate);totalPrice.textContent=formatIndianNumber(total);const pct=((area-areaSlider.min)/(areaSlider.max-areaSlider.min))*100;areaSlider.style.background=`linear-gradient(to right,#9c5f52 0%,#9c5f52 ${pct}%,#ddd5ce ${pct}%,#ddd5ce 100%)`;levelButtons.forEach(b=>b.classList.toggle('active',b.dataset.level===selectedLevel))}
if(areaSlider)areaSlider.addEventListener('input',updateCalculator);
levelButtons.forEach(button=>button.addEventListener('click',()=>{selectedLevel=button.dataset.level;updateCalculator()}));
function openCalculator(){window.open(`${window.location.pathname}?calculator=true`,'_blank');}
function goToConsultation(){localStorage.setItem('selectedDesignLevel',selectedLevel);localStorage.setItem('selectedArea',areaSlider.value);localStorage.setItem('estimatedBudget',areaSlider.value*designPrices[selectedLevel]);window.location.href=window.location.pathname+'#contact';}
const params=new URLSearchParams(window.location.search);if(params.get('calculator')==='true'){document.body.classList.add('calculator-mode');document.title='Interior Budget Estimator | Kalka Interiors';}
updateCalculator();