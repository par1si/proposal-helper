const button = document.getElementById('submit');
const currentDealCommission = document.getElementById('current-deal-commission');
const currentICROutput = document.getElementById('current-icr-output');
const percentageToQuotaOutput = document.getElementById('percentage-to-quota-output');

// Declaring variable outside of the functions below so that they're in the global scope
let quarterlyQuotaValue
let variableCompValue
let currentAttainment

let percentageToQuota

let currentTermLength
let currentACV
let currentMultiYearRevenue
let currentServicesHours
let currentPaymentTerms
let totalCommission

let multiYearCommission
let servicesCommission
let acvCommission

let currentICR
let currentPayout

function getCompPlanValues () {
    quarterlyQuota = document.getElementById('quarterly-quota').value
    variableComp = document.getElementById('variable-comp').value
    currentAttainment = document.getElementById('current-attainment').value
    currentICR = (variableComp / 4) / quarterlyQuota
    percentageToQuota = Math.floor((currentAttainment / quarterlyQuota)*100)
}

function getDealValues () {
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
    currentICROutput.innerHTML = currentICR
    percentageToQuotaOutput.innerHTML = percentageToQuota + `%`
};

button.addEventListener('click', getCompPlanValues);
button.addEventListener('click', getDealValues);
button.addEventListener('click', calculateCommission);
button.addEventListener('click', changeText);

