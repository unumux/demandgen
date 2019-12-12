(function () {  
    // JS for https://www.unum.com/employers/contact-sales-copy
    const thisForm = document.querySelector('form[data-wffm]');
    const selectControl = document.querySelector('form[data-wffm] select'); // the 1st one in the form
    const submitBtn = document.querySelector('form[data-wffm] input[type=submit].btn');

    let messageForIndividuals = 'For the fastest answer to all your questions, <a href="https://www.unum.com/employees/contact-us">reach out to us here</a>, contact your HR representative, or call our Customer Care Center at 866-679-3054. (Hours of operations from 8am-8pm EST Monday – Friday)';
    let messageForBrokers = 'Have a Unum sales representative contact you about partnering to grow your business by <a href="https://www.unum.com/brokers/contact-sales">contacting us here</a>.';

    // Create element for the EE Notice & append to form
    const customMessage = document.createElement('span');
    customMessage.id = 'customMessageEl';
    customMessage.style.display = "none";
    customMessage.innerHTML = messageForIndividuals;
    thisForm.appendChild(customMessage);

    // let formAreaToToggle = document.querySelector('form[data-wffm] div.form-group ~ fieldset');
    // let formAreaToToggle = document.querySelector('form[data-wffm] fieldset:nth-of-type(2)');
    let formAreaToToggle = document.querySelector('form[data-wffm] fieldset');
        // formAreaToToggle.outerHTML+='<div id="customMessageEl">This is the super important message only for employees</div>';

    // formAreaToToggle = document.querySelector('form[data-wffm] div.form-group ~ fieldset');  // set again because doing the outerHTML insertion messes with the orig.
    // formAreaToToggle = document.querySelector('form[data-wffm] fieldset:nth-of-type(2)');  // set again because doing the outerHTML insertion messes with the orig.
    // formAreaToToggle = document.querySelector('form[data-wffm] fieldset');  // set again because doing the outerHTML insertion messes with the orig.
    customMessageEl = document.querySelector('#customMessageEl')

    selectControl.addEventListener("change", function(e) {
        // console.log('event from selectControl(e):', e)
        switch(selectControl.value) {
            case "Individual":
                showIndividual();
                break;
            case "Employee":
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
        console.log('welcome to showIndividual()...')
        formAreaToToggle.style.display = "none";
        customMessageEl.style.display = "block";
        customMessageEl.innerHTML = messageForIndividuals;
        submitBtn.style.display = "none";
    }
    function showEmployer(){
        console.log('welcome to showEmployer()...')
        customMessageEl.style.display = "none";
        formAreaToToggle.style.display = "block";
        submitBtn.style.display = "inherit";
    }
    function showBroker(){
        console.log('welcome to showBroker()...')
        formAreaToToggle.style.display = "none";
        customMessageEl.style.display = "block";
        customMessageEl.innerHTML = messageForBrokers;
        submitBtn.style.display = "none";
    }
    function defaultState(){
        console.log('welcome to defaultState()...')
        formAreaToToggle.style.display = "none";
        customMessageEl.style.display = "none";
        customMessageEl.innerHTML = messageForIndividuals;
        submitBtn.style.display = "none";
    }

})();