const button = document.getElementById('submit');
const currentDealCommission = document.getElementById('current-deal-commission');
const expectedPayout = document.getElementById('expected-payout');
const percentageToQuotaHeader = document.getElementById('percentage-to-quota-output-header');
const expectedPayoutHeader = document.getElementById('expected-payout-header');
const currentICROutput = document.getElementById('current-icr-output');
const percentageToQuotaOutput = document.getElementById('percentage-to-quota-output');
const smallerRecommendedDeal = document.getElementById('smaller-recommended-deal');
const largerRecommendedDeal = document.getElementById('larger-recommended-deal');
const recommendedDealDiv = document.getElementById('recommended-deals-container')


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


let multiYearCommission
let servicesCommission
let acvCommission
let totalCommission
const multiYearCommissionPercentage = .04
const servicesCommissionPercentage = .04

let ICR
let acceleratorOne
let acceleratorTwo
let acceleratorThree
let acceleratorFour
let acceleratorBreakpointOne
let acceleratorBreakpointTwo
let acceleratorBreakpointThree
let acceleratorBreakpointFour

let proposedOneYearDealACV = 0
let proposedTwoYearDealACV = 0
let proposedThreeYearDealACV = 0

let oneYearDealCommission = 0
let twoYearDealCommission = 0
let threeYearDealCommission = 0

let j = 0

function getValues () {
    quarterlyQuota = document.getElementById('quarterly-quota').value
    variableComp = document.getElementById('variable-comp').value
    currentAttainment = document.getElementById('current-attainment').value
    currentTermLength = document.getElementById('current-term-length').value
    currentACV = parseInt(document.getElementById('current-acv').value, 10)
    currentMultiYearRevenue = document.getElementById('current-multi-year-revenue').value
    currentServicesHours = document.getElementById('current-services-hours').value
    currentTermLength = document.getElementById('current-term-length').value
    ICR = (((variableComp / 4) / quarterlyQuota)).toFixed(3)
    displayedICR = (((variableComp / 4) / quarterlyQuota)*100).toFixed(2)
    percentageToQuota = ((+currentAttainment / quarterlyQuota)*100).toFixed(2)
    percentageToQuotaWithDeal = (((+currentAttainment + +currentACV) / quarterlyQuota)*100).toFixed(2)
    // Updating values
    acceleratorOne = ICR * 2
    acceleratorTwo = ICR * 2.5
    acceleratorThree = ICR * 2
    acceleratorFour = ICR * 1.5
    acceleratorBreakpointOne = quarterlyQuota
    acceleratorBreakpointTwo = quarterlyQuota * 1.25
    acceleratorBreakpointThree = quarterlyQuota * 1.5
    acceleratorBreakpointFour = quarterlyQuota * 2
}

function getACVCommission (num) {
    acvCommission = 0;
    for (i = +currentAttainment; i < (+currentAttainment + num); i++) {
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
};

function getServicesCommission (acv) {
    if ((+currentServicesHours * 250) >= acv * .25) {
        servicesCommission = (+currentServicesHours * 250) * servicesCommissionPercentage
    } else {
        servicesCommission = 0;
    }
}

function getCommission () {
    getACVCommission(currentACV);
    getMultiYearCommission();
    getServicesCommission(currentACV);
    totalCommission = acvCommission + multiYearCommission + servicesCommission
}


function getOneYearOption () {
    proposedOneYearDealACV = 0;
    getACVCommission(+currentTermLength)
    while ((acvCommission + servicesCommission) < totalCommission) {
        proposedOneYearDealACV += 250
        getACVCommission(proposedOneYearDealACV)
        getServicesCommission(proposedOneYearDealACV)
    }
    oneYearDealCommission = acvCommission + servicesCommission
}


function getTwoYearOption () {
    getACVCommission(+currentTermLength)
    while ((acvCommission + (proposedTwoYearDealACV * multiYearCommissionPercentage) + servicesCommission) < totalCommission) {
        proposedTwoYearDealACV+= 250
        getACVCommission(proposedTwoYearDealACV)
        getServicesCommission(proposedTwoYearDealACV)
    }
    twoYearDealCommission = acvCommission + (proposedTwoYearDealACV * (multiYearCommissionPercentage)) + servicesCommission
}

function getThreeYearOption () {
    proposedThreeYearDealACV = 0;
    getACVCommission(+currentTermLength)
    while (acvCommission + (proposedThreeYearDealACV * (multiYearCommissionPercentage * 2) + servicesCommission) < totalCommission) {
        proposedThreeYearDealACV+= 250
        getACVCommission(proposedThreeYearDealACV)
        getServicesCommission(proposedThreeYearDealACV)
    }
    threeYearDealCommission = acvCommission + (proposedThreeYearDealACV * (multiYearCommissionPercentage * 2)) + servicesCommission
}

function proposeDealOptions () {
    if (+currentTermLength === 1) {
        getTwoYearOption()
        getThreeYearOption()
    } else if (+currentTermLength === 2) {
        getOneYearOption()
        getThreeYearOption()
    } else if (+currentTermLength === 3) {
        getOneYearOption()
        getTwoYearOption()
    }
}


function numberWithCommas(x) {
    return (x.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

function recommendOneYearDeal(dealDiv) {
    getServicesCommission(proposedOneYearDealACV)
    dealDiv.innerHTML = `The one year deal that will retain this compensation has an ACV of $${numberWithCommas(proposedOneYearDealACV)}. <br><br>
    <b><i>Deal Structure:</i></b> <br>
    <b>ACV: </b> $${numberWithCommas(proposedOneYearDealACV)}<br>
    <b>Term Length: </b> 1 Year<br>
    <b>Services Hours: </b> ${currentServicesHours}<br>
    <b>Discount Percentage: </b>${numberWithCommas(((currentACV - proposedOneYearDealACV)/currentACV)*100)}%<br><br>
    You'll get paid $${numberWithCommas(totalCommission)} on the one-year ACV<br>
    and a $${numberWithCommas(servicesCommission)} bonus on the services.<br>`
};

function recommendTwoYearDeal(dealDiv) {
    getServicesCommission(proposedTwoYearDealACV)
    dealDiv.innerHTML = `The two year deal that will retain this compensation has an ACV of $${numberWithCommas(proposedTwoYearDealACV)}. <br><br>
    <b><i>Deal Structure:</i></b> <br>
    <b>ACV: </b> $${numberWithCommas(proposedTwoYearDealACV)}<br>
    <b>Term Length: </b> 2 Year<br>
    <b>Services Hours: </b> ${currentServicesHours}<br>
    <b>Discount Percentage: </b>${numberWithCommas(((currentACV - proposedTwoYearDealACV)/currentACV)*100)}%<br><br>
    You'll get $${numberWithCommas(twoYearDealCommission - (proposedTwoYearDealACV * multiYearCommissionPercentage))} on the ACV, <br>
    a $${numberWithCommas(servicesCommission)} bonus on the services, <br>
    and $${numberWithCommas(proposedTwoYearDealACV * multiYearCommissionPercentage)} on the multi-year revenue.`
};

function recommendThreeYearDeal(dealDiv) {
    getServicesCommission(proposedThreeYearDealACV)
    dealDiv.innerHTML = `The three year deal that will retain this compensation has an ACV of $${numberWithCommas(proposedThreeYearDealACV)}. <br><br>
    <b><i>Deal Structure:</i></b> <br>
    <b>ACV:</b> $${numberWithCommas(proposedThreeYearDealACV)}<br>
    <b>Term Length:</b> 3 Year<br>
    <b>Services Hours:</b> ${currentServicesHours}<br>
    <b>Discount Percentage: </b>${numberWithCommas(((currentACV - proposedThreeYearDealACV)/currentACV)*100)}%<br><br>

    You'll get $${numberWithCommas(threeYearDealCommission - (proposedThreeYearDealACV * (multiYearCommissionPercentage * 2)))} on the ACV, <br>
    a $${numberWithCommas(servicesCommission)} bonus on the services, <br>
    and $${numberWithCommas(proposedThreeYearDealACV * (multiYearCommissionPercentage * 2))} on the multi-year revenue.`
};

function fillRecommendedDealsDiv () {
    if (+currentTermLength === 1) {
        recommendTwoYearDeal(smallerRecommendedDeal)
        recommendThreeYearDeal(largerRecommendedDeal)
    } else if (+currentTermLength === 2) {
        recommendOneYearDeal(smallerRecommendedDeal)
        recommendThreeYearDeal(largerRecommendedDeal)
    } else if (+currentTermLength === 3) {
        recommendOneYearDeal(smallerRecommendedDeal)
        recommendTwoYearDeal(largerRecommendedDeal)
    }
}

function changeText () {
    currentDealCommission.innerHTML = `Your commission on this deal is $${numberWithCommas(totalCommission)}.`
    fillRecommendedDealsDiv()
    recommendedDealDiv.style = 'display: inherit;'
    expectedPayout.style = 'display: inline-block'
    percentageToQuotaHeader.style = 'display: inline-block'
    expectedPayoutHeader.style = 'display: inline-block'
    percentageToQuotaOutput.innerHTML = percentageToQuotaWithDeal + `%`
    percentageToQuotaHeader.scrollIntoView()
};

button.addEventListener('click', getValues);
button.addEventListener('click', getCommission);
button.addEventListener('click', proposeDealOptions);
button.addEventListener('click', changeText);

