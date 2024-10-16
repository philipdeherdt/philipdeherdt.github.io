(function () {
    "use strict";
    /*
     * Form Validation
     */
  
    // Fetch all the forms we want to apply custom validation styles to
    const forms = document.querySelectorAll(".needs-validation");
    const result = document.getElementById("result");
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
  
            form.querySelectorAll(":invalid")[0].focus();
          } else {
            /*
             * Form Submission using fetch()
             */
  
            const formData = new FormData(form);
            event.preventDefault();
            event.stopPropagation();
            const object = {};
            formData.forEach((value, key) => {
              object[key] = value;
            });
            const json = JSON.stringify(object);
            result.classList.remove("d-none")
            result.innerHTML = "Uw bericht wordt verzonden...";
  
            fetch("https://api.web3forms.com/submit", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
              },
              body: json
            })
              .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                  console.log(json.message);
                  result.innerText = "Bericht succesvol verzonden";
                  result.classList.remove("text-gray-500");
                  result.classList.add("text-green-500");
                } else {
                  console.log(response);
                  console.log(json.message);
                  result.innerText = json.message;
                  result.classList.remove("text-gray-500");
                  result.classList.add("text-red-500");
                }
              })
              .catch((error) => {
                console.log(error);
                result.innerHTML = "Bericht kon niet verzonden worden. Probeer later opnieuw.";
              })
              .then(function () {
               /* form.reset();*/
                form.classList.remove("was-validated");
                setTimeout(() => {
                  result.style.display = "none";
                  result.classList.add("d-none");
                }, 5000);
              });
          }
          form.classList.add("was-validated");
        },
        false
      );
    });
  })();
  