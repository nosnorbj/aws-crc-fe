const counter = document.querySelector(".counter-number");

async function updateCounter() {
    let response = await fetch("https://qsbpgbr52hgnejffwufkaln7da0rfpqp.lambda-url.us-east-1.on.aws/");
    let data = await response.json();
    counter.innerHTML = `Views: ${data}`;
}

updateCounter();
