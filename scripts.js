document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    const form = document.getElementById("contactForm");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;
        if (name && email && message) {
            fetch('http://localhost:3000/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, message })
            })
            .then(response => response.text())
            .then(data => {
                alert(data);
                form.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error submitting the form.');
            });
        } else {
            alert("Please fill out all fields before submitting.");
        }
    });
});

let slideIndex = 1;
showSlides(slideIndex);
function showSlides(n) {
    let slides = document.getElementsByClassName("banner-slide");
    const indicators = document.getElementsByClassName("indicator");
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        indicators[i].className = indicators[i].className.replace(" active-indicator", "");
    }
    slides[slideIndex - 1].style.display = "block";
    indicators[slideIndex - 1].className += " active-indicator";
}

window.changeSlide = function(n) {
    showSlides(slideIndex += n);
}

window.currentSlide = function(n) {
    showSlides(slideIndex = n);
}

setInterval(() => {
    showSlides(slideIndex += 1);
}, 10000); // Change image every 10 seconds