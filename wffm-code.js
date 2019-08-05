(function () {  
    // Get all the things
    let thisForm = document.querySelector("form[data-wffm]");
    //let formControls = thisForm.querySelectorAll('input[type="radio"]');
    let selectControl = thisForm.querySelector("select.form-control");
    let submitButton = thisForm.querySelector('input[type="submit"]');
    let formFields = getFormFieldsContainer(thisForm, "legend", "info");
    let eeNumber = getFormFieldsContainer(thisForm, "label", "company size");

    // The following is only used/available if the .custom-message class is added to WFFM & used on the form field.
    let customMsg =  thisForm.querySelector('.custom-message input[type=text]'); 

    // Create element for the EE Notice & append to form
    let eeNotice = document.createElement("span");
    eeNotice.id = "eeNotice";
    eeNotice.style.display = "none";
    eeNotice.innerHTML = customMsg ? customMsg.value : "For the fastest answer to all your questions, reach out to us here, contact your HR representative, or call our Customer Care Center at 866-679-3054. (Hours of operations from 8am-8pm EST Monday – Friday)";
    thisForm.appendChild(eeNotice);


    // This function is used to get the parent/containing element of the elements that we are going to show or hide by matching the text in the inner html.
    function getFormFieldsContainer(form, element, data) {
        let items = form.querySelectorAll(element), parent = null;

        let itemArr = [].slice.call(items);  // B/c IE11 doesn't like the spread operator.
        
        if(items.length > 0) {
            itemArr.forEach(function(el) {
                if(el.innerHTML.toLowerCase().trim() === data) {
                    parent = el.parentNode;
                } 
            });
        }
        
        return parent
    }

    function showEmployee() {
        eeNotice.style.display = "";
        formFields.style.display = "none";
        submitButton.style.display = "none";
    }

    function showEmployer() {
        eeNotice.style.display = "none";
        formFields.style.display = "block";
        submitButton.style.display = "inline-block";
        if(eeNumber) {
            const eeNumInput = eeNumber.querySelector('select');
            eeNumInput.value = '';
            eeNumber.style.display = "inline-block";
        }
    }

    function showBroker() {
        eeNotice.style.display = "none";
        formFields.style.display = "block";
        submitButton.style.display = "inline-block";
        if(eeNumber){
            const eeNumInput = eeNumber.querySelector('select');
            eeNumber.style.display = "none";
            eeNumInput.value = '2 - 9';
        }
    }

    function defaultState() {
        eeNotice.style.display = "none";
        formFields.style.display = "none";
        submitButton.style.display = "none";
    }

    // [...formControls].forEach((control) => { 
    //     control.addEventListener("click", (e) => {
    //         switch(e.target.value) {
    //             case "Employee":
    //                 showEmployee();
    //                 break;
    //             case "Broker":
    //                 showBroker();
    //                 break;
    //             default:
    //                 showEmployer();
    //         }
    //     });
    // });

    selectControl.addEventListener("change", function(e) {
        switch(selectControl.value) {
            case "Employee":
                showEmployee();
                break;
            case "Broker":
                showBroker();
                break;
            case "Employer":
                showEmployer();
                break;
            default:
                defaultState();
        }
    });

    selectControl.addEventListener("keydown", function(e) {
        if(e.key === "Enter")
		    e.preventDefault();
    });

})();