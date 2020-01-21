const button = document.getElementById('submit');
const currentDealCommission = document.getElementById('current-deal-commission');
const currentICROutput = document.getElementById('current-icr-output');
const percentageToQuotaOutput = document.getElementById('percentage-to-quota-output');

// Declaring variable outside of the functions below so that they're in the global scope
let quarterlyQuotaValue
let variableCompValue
let currentAttainment

let percentageToQuota
let percentageToQuotaWithDeal

let currentTermLength
let currentACV
let currentMultiYearRevenue
let currentServicesHours
let currentPaymentTerms

let multiYearCommission
let servicesCommission
let acvCommission
let subTotalCommission
let totalCommission

let basePayout
let acceleratorPayoutOne
let acceleratorPayoutTwo
let acceleratorMultiplierOne = 2
let acceleratorMultiplierTwo = 2.5
let acceleratorMultiplierThree = 1.5

let currentICR
let currentPayout

function getValues () {
    quarterlyQuota = document.getElementById('quarterly-quota').value
    variableComp = document.getElementById('variable-comp').value
    currentAttainment = document.getElementById('current-attainment').value
    currentTermLength = document.getElementById('current-term-length').value
    currentACV = document.getElementById('current-acv').value
    currentMultiYearRevenue = document.getElementById('current-multi-year-revenue').value
    currentServicesHours = document.getElementById('current-services-hours').value
    currentPaymentTerms = document.getElementById('current-payment-terms').value
    currentICR = (((variableComp / 4) / quarterlyQuota)).toFixed(3)
    displayedICR = (((variableComp / 4) / quarterlyQuota)*100).toFixed(2)
    percentageToQuota = ((+currentAttainment / quarterlyQuota)*100).toFixed(2)
    percentageToQuotaWithDeal = (((+currentAttainment + +currentACV) / quarterlyQuota)*100).toFixed(2)
}

function getBasePayout() {
    if (percentageToQuota <= 100) {
    basePayout = (+quarterlyQuota - +currentAttainment) * currentICR
    } else {
    basePayout = 0;
    }
};

function getAcceleratorPayoutOne () {
    if ((percentageToQuota <= 125) && (percentageToQuotaWithDeal >= 100)) {
    acceleratorPayoutOne = (+quarterlyQuota * .25) * (currentICR * acceleratorMultiplierOne)
    } else if (((percentageToQuota <= 125) && (percentageToQuota > 100)) && (percentageToQuotaWithDeal >= 100)) {
    acceleratorPayoutOne = ((+quarterlyQuota * 1.25) - +currentAttainment) * (currentICR * acceleratorMultiplierOne)
    } else {
    acceleratorPayoutOne = 0
    }
};

function getAcceleratorPayoutTwo () {
    if (((percentageToQuota <= 200) && (percentageToQuota >= 125)) && (percentageToQuotaWithDeal >= 125)) {
    acceleratorPayoutTwo = ((+quarterlyQuota * .75) - +currentAttainment) * (currentICR * acceleratorMultiplierOne)
    } else {
    acceleratorPayoutTwo = 0
    }
};

function getACVCommission () {
    getBasePayout();
    getAcceleratorPayoutOne();
    getAcceleratorPayoutTwo();
    if (percentageToQuotaWithDeal <= 100) {
        acvCommission = (currentICR * currentACV)
    } else if (percentageToQuotaWithDeal <= 125) {
        acvCommission = ((+currentAttainment + +currentACV) - +quarterlyQuota) * (currentICR * acceleratorMultiplierOne) + basePayout
    } else if (percentageToQuotaWithDeal <= 200) {
        acvCommission = ((+currentAttainment + +currentACV) - (+quarterlyQuota * 1.25)) * (currentICR * acceleratorMultiplierTwo) + basePayout + acceleratorPayoutOne
    } else if (percentageToQuotaWithDeal > 200) {
        acvCommission = (+currentACV * (currentICR * acceleratorMultiplierThree))
    }
};

function calculateCommission () {
    multiYearCommission = (.04 * currentMultiYearRevenue)
    servicesCommission = (.01 * currentServicesHours)
    getACVCommission()
    totalCommission = acvCommission + multiYearCommission + servicesCommission
};

function changeText () {
    currentDealCommission.innerHTML = totalCommission
    currentICROutput.innerHTML = displayedICR + `%`
    percentageToQuotaOutput.innerHTML = percentageToQuotaWithDeal + `%`
};

button.addEventListener('click', getValues);
button.addEventListener('click', calculateCommission);
button.addEventListener('click', changeText);

