(function () {  

    // Get all the things
    var url = window.location.href;
    var isCL = url.indexOf("coloniallife.com") !== -1 ? true : false;
    var thisForm = document.querySelector("form[data-wffm].controlled-form");
    if (thisForm === null) //if the form is not found, bail out!
        return;
    var selectControl = thisForm.querySelector("select.form-control");
    var submitButton = thisForm.querySelector('input[type="submit"]');
    // const closeButton = getCloseButton(thisForm); // removed this line to test fix

    var formFields = getFormFieldsContainer(thisForm, "legend", "form-fields");
    var eeNumber = getFormFieldsContainer(thisForm, "label", "company size") || getFormFieldsContainer(thisForm, "label", "number of employees");

    // Static messages
    var unumIndvMsg = "For the fastest answer to all your questions, reach out to us <a href='https://www.unum.com/employees/contact-us'>here</a>, contact your HR representative, or call our Customer Care Center at 866-679-3054. (Hours of operations from 8am-8pm EST Monday \u2013 Friday)";
    var clIndvMsg = "For the fastest answer to all your questions, reach out to us <a href='https://www.coloniallife.com/individuals/policyholder-support'>here</a>, contact your HR representative, or call our Customer Care Center at 800-325-4368. (Hours of operations from 8am-8pm EST Monday \u2013 Friday)";
    var clAgntMsg = "For the fastest answer to all your questions, start out <a href='https://www.coloniallife.com/about/contact-us/agent-support'>here</a>. Still need help? Our service specialists are here to assist you and can be reached at 800-483-6423. (Hours of operations from 8am-7pm EST Monday \u2013 Friday)"; // The following is only used/available if the .custom-message class is added to WFFM & used on the form field.

    var customMsg = thisForm.querySelector('.custom-message input[type=text]'); // Create element for the EE Notice & append to form

    var eeNotice = document.createElement("span");
    eeNotice.id = "eeNotice";
    eeNotice.style.display = "none";
    eeNotice.innerHTML = customMsg ? customMsg.value : isCL ? clIndvMsg : unumIndvMsg; // Yes, these are 2 ternary operators strung together. Yes, IK it's not the best practice. It'll be ok tho.

    thisForm.appendChild(eeNotice); // Create element for the Agent Notice & append to form

    var agNotice = document.createElement("span");
    agNotice.id = "agNotice";
    agNotice.style.display = "none";
    agNotice.innerHTML = customMsg ? customMsg.value : clAgntMsg;
    thisForm.appendChild(agNotice);

    // This function is used to get the parent/containing element of the elements that we are going to show or hide by matching the text in the inner html.
    function getFormFieldsContainer(form, element, data) {
        var items = form.querySelectorAll(element),
            parent = null;
        var itemArr = [].slice.call(items); // B/c IE11 doesn't like the spread operator.

        if (items.length > 0) {
            itemArr.forEach(function(el) {
                if (el.innerHTML.toLowerCase().trim() === data) {
                    parent = el.parentNode;
                }
            });
        }

        return parent;
    }

    function getCloseButton(form) {
        var parent = form.parentNode;

        while (!parent.classList.contains('willow-dialog') && parent.tagName !== "HTML") {
            parent = parent.parentNode;
        }

        var close = parent.querySelector('.willow-dialog__close');
        return close;
    }

    function handleEENumber(state) {
        var eeNumInput = eeNumber.querySelector('select') || eeNumber.querySelector('input[type="text"]');
        var eeNumType = eeNumInput.getAttribute("type");

        if (state === "hide") {
            eeNumber.style.display = "none";

            if (eeNumType === "text") {
                eeNumInput.value = 0;
            } else {
                //eeNumInput.value = '2 - 9';
                eeNumInput.options[0].value = 'na';     // na is used instead of a valid eeNumber so it's not confused in the data
                eeNumInput.options[0].innerHTML = 'na'; // na is used instead of a valid eeNumber so it's not confused in the data
            }
        } else {
            // state === "show"
            eeNumInput.value = '';
            eeNumber.style.display = "inline-block";

            if (eeNumType === "text") {} else {
                // if a select...reset from possible na value from broker
                eeNumInput.options[0].value = '';
                eeNumInput.options[0].innerHTML = '';
            }
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

        if (eeNumber) {
            handleEENumber("show");
        }
    }

    function showBroker() {
        eeNotice.style.display = "none";
        agNotice.style.display = "none";
        formFields.style.display = "block";
        submitButton.style.display = "inline-block";

        if (eeNumber) {
            //console.log('about to call handleEENumber for showBroker()...');
            handleEENumber("hide");
        }
    }

    function defaultState() {
        eeNotice.style.display = "none";
        agNotice.style.display = "none";
        formFields.style.display = "none";
        submitButton.style.display = "none";
    }

    selectControl.addEventListener("change", function(e) {
        switch (selectControl.value) {
            case "Agent":
                resetFormValidationErrors();
                showAgent();
                break;

            case "Individual":
                resetFormValidationErrors();
                showEmployee();
                break;

            case "Employee":
                resetFormValidationErrors();
                showEmployee();
                break;

            case "Broker":
                resetFormValidationErrors();
                showBroker();
                break;

            case "Employer":
                resetFormValidationErrors();
                showEmployer();
                break;

            default:
                resetFormValidationErrors();
                defaultState();
        }
    });
    selectControl.addEventListener("keydown", function(e) {
        if (e.key === "Enter") e.preventDefault();
    });

    // closeButton.addEventListener('click', function(e){
    //     selectControl.value = 'default';
    //     defaultState();
    // });

    function resetFormValidationErrors() {
        var summaryBox = document.querySelector('.has-feedback .validation-summary-errors');
        if (summaryBox) {
            summaryBox.classList.remove('validation-summary-errors');
            summaryBox.classList.remove('validation-summary-valid');
            summaryBox.querySelector('ul').innerHTML = '';
            summaryBox.querySelector('ul').innerHTML = "<li style=\"display:none\"></li>";
        }

        var allHasErrorEls = Array.prototype.slice.call(document.querySelectorAll('.required-field.has-error'));
        if (allHasErrorEls) {
            allHasErrorEls.map(function(el) {
                el.classList.remove('has-error');
                el.classList.remove('field-validation-error');
                el.classList.add('field-validation-valid');
            });
        }

        var allHelpBlocks = Array.prototype.slice.call(document.querySelectorAll('.help-block.field-validation-error'));
        if (allHelpBlocks) {
            allHelpBlocks.map(function(el) {
                el.classList.remove('field-validation-error');
                el.classList.add('field-validation-valid');
                el.querySelector('span').remove(); // delete the span inside it...
            });
        }

        var allRemaining = Array.prototype.slice.call(document.querySelectorAll('.input-validation-error'));
        if (allRemaining) {
            allRemaining.map(function(el) {
                el.classList.remove('input-validation-error');
                el.classList.add('input-validation-valid');
            });
        }
    }

    // Create Element.remove() function if not exist (ie11) - used in resetFormValidationErrors()
    if (!('remove' in Element.prototype)) {
        Element.prototype.remove = function() {
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
        };
    }

})();