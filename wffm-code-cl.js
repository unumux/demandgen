(function () {  
    // Get all the things
    const url = window.location.href;
    let isCL = url.indexOf("coloniallife.com") !== -1 ? true : false;
    const thisForm = document.querySelector("form[data-wffm]");
    const selectControl = thisForm.querySelector("select.form-control");
    const submitButton = thisForm.querySelector('input[type="submit"]');
    const formFields = getFormFieldsContainer(thisForm, "legend", "form-fields");
    const eeNumber = getFormFieldsContainer(thisForm, "label", "company size");

    console.log(isCL);

    // The following is only used/available if the .custom-message class is added to WFFM & used on the form field.
    const customMsg =  thisForm.querySelector('.custom-message input[type=text]'); 

    // Create element for the EE Notice & append to form
    const eeNotice = document.createElement("span");
    eeNotice.id = "eeNotice";
    eeNotice.style.display = "none";
    eeNotice.innerHTML = customMsg ? customMsg.value : "For the fastest answer to all your questions, reach out to us here, contact your HR representative, or call our Customer Care Center at 866-679-3054. (Hours of operations from 8am-8pm EST Monday – Friday)";
    thisForm.appendChild(eeNotice);

    // Create element for the Agent Notice & append to form
    const agNotice = document.createElement("span");
    agNotice.id = "agNotice";
    agNotice.style.display = "none";
    agNotice.innerHTML = customMsg ? customMsg.value : `For the fastest answer to all your questions, start out <a href='https://www.coloniallife.com/about/contact-us/agent-support'>here</a>. Still need help? Our service specialists are here to assist you and can be reached at 800-483-6423. (Hours of operations from 8am-7pm EST Monday – Friday)`;
    thisForm.appendChild(agNotice);


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

    function showAgent() {
        agNotice.style.display = "";
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

    selectControl.addEventListener("change", function(e) {
        switch(selectControl.value) {
            case "Agent":
                showAgent();
                break;
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