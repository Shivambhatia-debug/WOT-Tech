document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".contact-form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const contactInput = document.getElementById("contact");
    const savedMessage = document.getElementById("saved-message");
  
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent page reload
  
      if (validateForm()) {
        saveFormDetails();
        savedMessage.style.display = "block";
        form.reset(); // Clear form fields after submission
        setTimeout(() => {
          savedMessage.style.display = "none";
        }, 3000);
        displaySavedUsers(); // Refresh saved users list
      }
    });
  
    function validateForm() {
      let isValid = true;
  
      if (nameInput.value.trim() === "") {
        alert("Please enter your name.");
        isValid = false;
      } else if (!validateEmail(emailInput.value)) {
        alert("Please enter a valid email.");
        isValid = false;
      } else if (!validatePhone(contactInput.value)) {
        alert("Please enter a valid contact number (10 digits).");
        isValid = false;
      }
  
      return isValid;
    }
  
    function validateEmail(email) {
      return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    }
  
    function validatePhone(phone) {
      return /^[0-9]{10}$/.test(phone);
    }
  
    function saveFormDetails() {
      const userData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        contact: contactInput.value.trim(),
      };
  
      let users = JSON.parse(localStorage.getItem("users")) || [];
      users.push(userData);
      localStorage.setItem("users", JSON.stringify(users));
  
      console.log("User Details Saved:", userData);
    }
  
    function displaySavedUsers() {
      const usersListContainer = document.getElementById("saved-users-list");
      if (!usersListContainer) {
        return;
      }
  
      usersListContainer.innerHTML = "<h3>Saved Contacts:</h3>";
      const users = JSON.parse(localStorage.getItem("users")) || [];
  
      if (users.length > 0) {
        users.forEach((user, index) => {
          usersListContainer.innerHTML += `
            <p><strong>${index + 1}. Name:</strong> ${user.name} | 
            <strong>Email:</strong> ${user.email} | 
            <strong>Contact:</strong> ${user.contact}</p>
          `;
        });
      } else {
        usersListContainer.innerHTML = "<p>No saved users yet.</p>";
      }
    }
  
    displaySavedUsers(); // Show saved users on page load
  });
  function scrollToForm() {
    const formSection = document.querySelector(".contact-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  }
  