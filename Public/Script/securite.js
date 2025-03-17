document.getElementById("output").textContent = userInput;

const safeInput = DOMPurify.sanitize(userInput);
document.getElementById("output").innerHTML = safeInput;
