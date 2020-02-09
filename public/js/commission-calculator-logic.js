// Defining Dom Elements
const button = document.getElementById('submit');
const currentDealCommission = document.getElementById('current-deal-commission');
const expectedPayout = document.getElementById('expected-payout');
const percentageToQuotaHeader = document.getElementById('percentage-to-quota-output-header');
const expectedPayoutHeader = document.getElementById('expected-payout-header');
const currentICROutput = document.getElementById('current-icr-output');
const percentageToQuotaOutput = document.getElementById('percentage-to-quota-output');
const recommendedOneYearDeal = document.getElementById('recommended-one-year-deal');
const recommendedThreeYearDeal = document.getElementById('recommended-three-year-deal');
const recommendedDealDiv = document.getElementById('recommended-deals-container')



// Setting values & commission logic
let ICR = 0
let acceleratorOne = 0
let acceleratorTwo = 0
let acceleratorThree = 0
let acceleratorFour = 0

let acceleratorBreakpointOne = 0
let acceleratorBreakpointTwo = 0
let acceleratorBreakpointThree = 0
let acceleratorBreakpointFour = 0

const multiYearCommissionPercentage = .04
const servicesCommissionPercentage = .04
let multiYearCommission = 0

let percentageToQuota = 0
let percentageToQuotaWithDeal = 0


function getValues () {
    quarterlyQuota = document.getElementById('quarterly-quota').value
    variableComp = document.getElementById('variable-comp').value
    currentAttainment = document.getElementById('current-attainment').value
    currentTermLength = document.getElementById('current-term-length').value
    currentACV = parseInt(document.getElementById('current-acv').value, 10)
    currentMultiYearRevenue = document.getElementById('current-multi-year-revenue').value
    currentServicesHours = document.getElementById('current-services-hours').value
    ICR = (((variableComp / 4) / quarterlyQuota)).toFixed(3)
    displayedICR = (((variableComp / 4) / quarterlyQuota)*100).toFixed(2)
    acceleratorOne = ICR * 2
    acceleratorTwo = ICR * 2.5
    acceleratorThree = ICR * 2
    acceleratorFour = ICR * 1.5
    acceleratorBreakpointOne = quarterlyQuota
    acceleratorBreakpointTwo = quarterlyQuota * 1.25
    acceleratorBreakpointThree = quarterlyQuota * 1.5
    acceleratorBreakpointFour = quarterlyQuota * 2
    percentageToQuota = ((+currentAttainment / quarterlyQuota)*100).toFixed(2)
    percentageToQuotaWithDeal = (((+currentAttainment + +currentACV) / quarterlyQuota)*100).toFixed(2)
}


let j = 0
let acvCommission = 0

function getACVCommission () {
    acvCommission = 0;
    for (i = +currentAttainment; i < (+currentAttainment + currentACV); i++) {
        j = i + 1
        if (i < acceleratorBreakpointOne) {
            acvCommission = acvCommission + ((j - i) * ICR)
        } else if (i >= acceleratorBreakpointOne && i < acceleratorBreakpointTwo){
            acvCommission = acvCommission + ((j - i) * acceleratorOne)
        } else if (i >= acceleratorBreakpointTwo && i < acceleratorBreakpointThree){
            acvCommission = acvCommission + ((j - i) * acceleratorTwo)
        } else if (i >= acceleratorBreakpointThree && i < acceleratorBreakpointFour) {
            acvCommission = acvCommission + ((j - i) * acceleratorThree)
        } else if (i >= acceleratorBreakpointFour) {
            acvCommission = acvCommission + ((j - i) * acceleratorFour)
        }
    }
}

function getMultiYearCommission () {
    if (+currentTermLength > 1) {
    multiYearCommission = currentMultiYearRevenue * multiYearCommissionPercentage
    } else {
    multiYearCommission = 0
    document.getElementById('current-multi-year-revenue').value = 0
    }
}

function getServicesCommission (acv) {
    if ((+currentServicesHours * 250) >= acv * .25) {
        servicesCommission = (+currentServicesHours * 250) * servicesCommissionPercentage
    } else {
        servicesCommission = 0;
    }
}

function getCommission () {
    getACVCommission();
    getMultiYearCommission();
    getServicesCommission(currentACV);
    totalCommission = acvCommission + multiYearCommission + servicesCommission
}


// Changing Text
function numberWithCommas(x) {
    return (x.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

function changeText () {
    currentDealCommission.innerHTML = `Your commission on this deal is $${numberWithCommas(totalCommission)}. <br>
    <br>
    $${numberWithCommas(acvCommission)} of that comes from ACV, <br>
    $${numberWithCommas(servicesCommission)} of that comes from the services bonus, <br>
    and $${multiYearCommission} of that comes from multi-year bonuses.`
    expectedPayout.style = 'display: block'
    percentageToQuotaHeader.style = 'display: inline-block'
    expectedPayoutHeader.style = 'display: block'
    percentageToQuotaOutput.innerHTML = percentageToQuotaWithDeal + `%`
    percentageToQuotaHeader.scrollIntoView()
};

button.addEventListener('click', getValues);
button.addEventListener('click', getCommission);
button.addEventListener('click', changeText);

