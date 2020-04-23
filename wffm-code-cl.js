(function () {  
    // Get all the things
    const url = window.location.href;
    let isCL = url.indexOf("coloniallife.com") !== -1 ? true : false;
    const thisForm = document.querySelector("form[data-wffm].controlled-form");
    let selectControl = null;
    let submitButton = null;
    let closeButton = null;
    let formFields = null;
    let eeNumber = null;
    let unumIndvMsg = null;
    let clIndvMsg = null;
    let clAgntMsg = null;
    let customMsg = null;
    let eeNotice = null;
    let agNotice = null;

    if(thisForm){ 
        selectControl = thisForm.querySelector("select.form-control");
        submitButton = thisForm.querySelector('input[type="submit"]');
        closeButton = getCloseButton(thisForm);
        formFields = getFormFieldsContainer(thisForm, "legend", "form-fields");
        eeNumber = getFormFieldsContainer(thisForm, "label", "company size") || getFormFieldsContainer(thisForm, "label", "number of employees");

        // Static messages
        unumIndvMsg = `For the fastest answer to all your questions, reach out to us <a href='https://www.unum.com/employees/contact-us/submit-question'>here</a>, contact your HR representative, or call our Customer Care Center at 866-679-3054. (Hours of operations from 8am-8pm EST Monday – Friday)`;
        clIndvMsg = `For the fastest answer to all your questions, reach out to us <a href='https://www.coloniallife.com/individuals/policyholder-support'>here</a>, contact your HR representative, or call our Customer Care Center at 800-325-4368. (Hours of operations from 8am-8pm EST Monday – Friday)`;
        clAgntMsg = `For the fastest answer to all your questions, start out <a href='https://www.coloniallife.com/about/contact-us/agent-support'>here</a>. Still need help? Our service specialists are here to assist you and can be reached at 800-483-6423. (Hours of operations from 8am-7pm EST Monday – Friday)`;
        
        // The following is only used/available if the .custom-message class is added to WFFM & used on the form field.
        customMsg =  thisForm.querySelector('.custom-message input[type=text]'); 

        // Create element for the EE Notice & append to form
        eeNotice = document.createElement("span");
        eeNotice.id = "eeNotice";
        eeNotice.style.display = "none";
        eeNotice.innerHTML = customMsg ? customMsg.value : isCL ? clIndvMsg : unumIndvMsg; // Yes, these are 2 ternary operators strung together. Yes, IK it's not the best practice. It'll be ok tho.
        thisForm.appendChild(eeNotice);

        // Create element for the Agent Notice & append to form
        agNotice = document.createElement("span");
        agNotice.id = "agNotice";
        agNotice.style.display = "none";
        agNotice.innerHTML = customMsg ? customMsg.value : clAgntMsg;
        thisForm.appendChild(agNotice);

        // The following may be needed later to handle multiple of the same forms on a page.  It's probably best to have seperate forms.

        // function handleForms() {
        //     let forms = document.querySelectorAll("form[data-wffm].controlled-form");
        //     let formArray = [].slice.call(forms);

        //     formArray.forEach(function(form){
        //         let currentForm = form;
        //         const selectControl = thisForm.querySelector("select.form-control");
        //         const submitButton = thisForm.querySelector('input[type="submit"]');
        //         const formFields = getFormFieldsContainer(thisForm, "legend", "form-fields");
        //         const eeNumber = getFormFieldsContainer(thisForm, "label", "company size") || getFormFieldsContainer(thisForm, "label", "number of employees");
        //     });

        // }

        selectControl.addEventListener("change", function(e) {
            switch(selectControl.value) {
                case "Agent":
                    showAgent();
                    break;
                case "Individual":
                    showEmployee();
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
    
        closeButton.addEventListener('click', function(e){
            selectControl.value = '';
            defaultState();
        });

    } // end if(thisForm)


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

    function getCloseButton(form) {
        let parent = form.parentNode;
        while(!parent.classList.contains('willow-dialog') && parent.tagName !== "HTML")
		{
			parent = parent.parentNode;
        }
        
        let close = parent.querySelector('.willow-dialog__close');
        return close;
    }

    function handleEENumber(state) {
        const eeNumInput = eeNumber.querySelector('select') || eeNumber.querySelector('input[type="text"]');
        const eeNumType = eeNumInput.getAttribute("type");
            if(state === "hide") {
                eeNumber.style.display = "none";
                if(eeNumType === "text")
                    eeNumInput.value = 0;
                else
                    eeNumInput.value = '2 - 9';
            }
            else{
                eeNumInput.value = '';
                eeNumber.style.display = "inline-block";
            }
    }

    function showEmployee() {
        eeNotice.style.display = "";
        agNotice.style.display = "none";
        formFields.style.display = "none";
        submitButton.style.display = "none";
    }

    function showAgent() {
        agNotice.style.display = "";
        eeNotice.style.display = "none";
        formFields.style.display = "none";
        submitButton.style.display = "none";
    }

    function showEmployer() {
        eeNotice.style.display = "none";
        agNotice.style.display = "none";
        formFields.style.display = "block";
        submitButton.style.display = "inline-block";
        if(eeNumber) {
            handleEENumber("show");
        }
    }

    function showBroker() {
        eeNotice.style.display = "none";
        agNotice.style.display = "none";
        formFields.style.display = "block";
        submitButton.style.display = "inline-block";
        if(eeNumber){
            handleEENumber("hide");
        }
    }

    function defaultState() {
        eeNotice.style.display = "none";
        agNotice.style.display = "none";
        formFields.style.display = "none";
        submitButton.style.display = "none";
    }

    

})();
