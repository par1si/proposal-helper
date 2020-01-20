const button = document.getElementById('submit');
const currentDealCommission = document.getElementById('current-deal-commission')

let currentTermLength
let currentACV
let currentMultiYearRevenue
let currentServicesHours
let currentPaymentTerms
let totalCommission

let multiYearCommission
let servicesCommission
let acvCommission

let currentICR = .125

function getValues () {
    currentTermLength = document.getElementById('current-term-length').value
    currentACV = document.getElementById('current-acv').value
    currentMultiYearRevenue = document.getElementById('current-multi-year-revenue').value
    currentServicesHours = document.getElementById('current-services-hours').value
    currentPaymentTerms = document.getElementById('current-payment-terms').value
};

function calculateCommission () {
    multiYearCommission = (.04 * currentMultiYearRevenue)
    servicesCommission = (.01 * currentServicesHours)
    acvCommission = (currentICR * currentACV)
    totalCommission = multiYearCommission + servicesCommission + acvCommission
};

function changeText () {
    currentDealCommission.innerHTML = totalCommission
};

button.addEventListener('click', getValues);
button.addEventListener('click', calculateCommission);
button.addEventListener('click', changeText);


console.log(currentTermLength)