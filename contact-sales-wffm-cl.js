(function () {  
    // README:
    //
    // Ivan:  This is a copy for Colonial Life based on contact-sales-wffm.js
    //
    // This is custom JavaScript to allow a top select field to display either the form or custom messages based on the selected option.
    // This has been created for https://www.unum.com/employers/contact-sales
    // Temp testing page at https://www.unum.com/employers/contact-sales-copy
    // https://github.com/unumux/demandgen
    //
    // Requirements:
    // - The site search in the header may need to be removed because it includes JS which hijacks event listener events.
    // - The select control (Drop list in Sitecore), should exist in it's own section in the Sitecore Form Designer.
    // - The rest of the form should exist in a separate section in Sitecore Form Designer.
    // - The section that the select controls lives in should have it's Title field either blank or have it's Appearance > Show Title value set to No in order to have it span full width
    // - The section that has the rest of the form SHOULD HAVE a non-blank Title (with Appearance > Show Title = Yes) in order to have a <fieldset> container tag.  Hide it with custom css if needed.
    // - Additional custom css needs to be added to the page which displays the form. To prehide the form/customMessage until the selectControl triggers.  See contact-sales-wff-styles.txt

    const thisForm = document.querySelector('form[data-wffm]');
    if(thisForm === null) { return; } // if the form is not found, bail out!
    const selectControl = document.querySelector('form[data-wffm] select'); // the 1st one in the form
    const submitBtn = document.querySelector('form[data-wffm] input[type=submit].btn');

    let messageForIndividuals = 'For the fastest answer to all your questions, <a href="https://www.coloniallife.com/individuals/policyholder-support">reach out to us here</a>, contact your HR representative, or call our Customer Care Center at 800-325-4368. (Hours of operations from 8am-8pm EST Monday – Friday)';

    let messageForBrokers = 'Have a Colonial Life sales representative contact you about partnering to grow your business by <a href="https://www.coloniallife.com/brokers/contact-sales">contacting us here</a>.';

    // Create element for the custom message & append to form
    const customMessage = document.createElement('span');
    customMessage.id = 'customMessageEl';
    customMessage.style.display = "none";
    customMessage.innerHTML = messageForIndividuals;
    thisForm.appendChild(customMessage);

    // This requires the selectControl    to exist in a separate Sitecore Form section with a Title that IS BLANK OR Appearance > Show Title = NO 
    // This requires the formAreaToToggle to exist in a separate Sitecore Form section with a Title that is not blank AND Appearance > Show Title = Yes
    // Otherwise another fieldset element will be created in the DOM and the below selector will select that one instead
    let formAreaToToggle = document.querySelector('form[data-wffm] fieldset');
    customMessageEl = document.querySelector('#customMessageEl')

    selectControl.addEventListener("change", function(e) {
        switch(selectControl.value) {
            case "Individual":
                showIndividual();
                break;
            case "Employee": // sometimes the value doesn't match the option text. ex: <option value="Employee">Individual</option>
                showIndividual();
                break;
            case "Employer":
                showEmployer();
                break;
            case "Broker":
                showBroker();
                break;
            default:
                defaultState();
        }
    });

    selectControl.addEventListener("keydown", function(e) {
        if(e.key === "Enter")
		    e.preventDefault();
    });

    function showIndividual(){
        formAreaToToggle.style.display = "none";
        customMessageEl.style.display = "block";
        customMessageEl.innerHTML = messageForIndividuals;
        submitBtn.style.display = "none";
    }
    function showEmployer(){
        customMessageEl.style.display = "none";
        formAreaToToggle.style.display = "block";
        submitBtn.style.display = "inherit";
    }
    function showBroker(){
        formAreaToToggle.style.display = "none";
        customMessageEl.style.display = "block";
        customMessageEl.innerHTML = messageForBrokers;
        submitBtn.style.display = "none";
    }
    function defaultState(){
        formAreaToToggle.style.display = "none";
        customMessageEl.style.display = "none";
        customMessageEl.innerHTML = messageForIndividuals;
        submitBtn.style.display = "none";
    }

})();