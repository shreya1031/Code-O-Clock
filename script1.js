// document.getElementById("subscribeForm").addEventListener("submit", function(e) {
//     e.preventDefault();
//     alert("Thank you for subscribing, " + document.getElementById("firstName").value + "!");
// });

// navigation.js

document.addEventListener("DOMContentLoaded", function () {
    const startBtn = document.getElementById("startTrackingBtn");

    if (startBtn) {
        startBtn.addEventListener("click", function () {
            window.location.href = "page2.html";   
        });
    }
});
