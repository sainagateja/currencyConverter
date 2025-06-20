const countryList = {
    AED: "AE",
    AFN: "AF",
    XCD: "AG",
    ALL: "AL",
    AMD: "AM",
    ANG: "AN",
    AOA: "AO",
    AQD: "AQ",
    ARS: "AR",
    AUD: "AU",
    AZN: "AZ",
    BAM: "BA",
    BBD: "BB",
    BDT: "BD",
    XOF: "BE",
    BGN: "BG",
    BHD: "BH",
    BIF: "BI",
    BMD: "BM",
    BND: "BN",
    BOB: "BO",
    BRL: "BR",
    BSD: "BS",
    NOK: "BV",
    BWP: "BW",
    BYR: "BY",
    BZD: "BZ",
    CAD: "CA",
    CDF: "CD",
    XAF: "CF",
    CHF: "CH",
    CLP: "CL",
    CNY: "CN",
    COP: "CO",
    CRC: "CR",
    CUP: "CU",
    CVE: "CV",
    CYP: "CY",
    CZK: "CZ",
    DJF: "DJ",
    DKK: "DK",
    DOP: "DO",
    DZD: "DZ",
    ECS: "EC",
    EEK: "EE",
    EGP: "EG",
    ETB: "ET",
    EUR: "FR",
    FJD: "FJ",
    FKP: "FK",
    GBP: "GB",
    GEL: "GE",
    GGP: "GG",
    GHS: "GH",
    GIP: "GI",
    GMD: "GM",
    GNF: "GN",
    GTQ: "GT",
    GYD: "GY",
    HKD: "HK",
    HNL: "HN",
    HRK: "HR",
    HTG: "HT",
    HUF: "HU",
    IDR: "ID",
    ILS: "IL",
    INR: "IN",
    IQD: "IQ",
    IRR: "IR",
    ISK: "IS",
    JMD: "JM",
    JOD: "JO",
    JPY: "JP",
    KES: "KE",
    KGS: "KG",
    KHR: "KH",
    KMF: "KM",
    KPW: "KP",
    KRW: "KR",
    KWD: "KW",
    KYD: "KY",
    KZT: "KZ",
    LAK: "LA",
    LBP: "LB",
    LKR: "LK",
    LRD: "LR",
    LSL: "LS",
    LTL: "LT",
    LVL: "LV",
    LYD: "LY",
    MAD: "MA",
    MDL: "MD",
    MGA: "MG",
    MKD: "MK",
    MMK: "MM",
    MNT: "MN",
    MOP: "MO",
    MRO: "MR",
    MTL: "MT",
    MUR: "MU",
    MVR: "MV",
    MWK: "MW",
    MXN: "MX",
    MYR: "MY",
    MZN: "MZ",
    NAD: "NA",
    XPF: "NC",
    NGN: "NG",
    NIO: "NI",
    NPR: "NP",
    NZD: "NZ",
    OMR: "OM",
    PAB: "PA",
    PEN: "PE",
    PGK: "PG",
    PHP: "PH",
    PKR: "PK",
    PLN: "PL",
    PYG: "PY",
    QAR: "QA",
    RON: "RO",
    RSD: "RS",
    RUB: "RU",
    RWF: "RW",
    SAR: "SA",
    SBD: "SB",
    SCR: "SC",
    SDG: "SD",
    SEK: "SE",
    SGD: "SG",
    SKK: "SK",
    SLL: "SL",
    SOS: "SO",
    SRD: "SR",
    STD: "ST",
    SVC: "SV",
    SYP: "SY",
    SZL: "SZ",
    THB: "TH",
    TJS: "TJ",
    TMT: "TM",
    TND: "TN",
    TOP: "TO",
    TRY: "TR",
    TTD: "TT",
    TWD: "TW",
    TZS: "TZ",
    UAH: "UA",
    UGX: "UG",
    USD: "US",
    UYU: "UY",
    UZS: "UZ",
    VEF: "VE",
    VND: "VN",
    VUV: "VU",
    YER: "YE",
    ZAR: "ZA",
    ZMK: "ZM",
    ZWD: "ZW",
};
const baseUrl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"
const dropdown = document.querySelectorAll(".dropdown select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const spam = document.querySelector("#spam");
let msg = document.querySelector(".msg");
let btn = document.querySelector('form button');


let action = document.querySelector("#enterValue");
let result = document.querySelector("#result");

for (let select of dropdown) {
    for (let currCode in countryList) {
        let navOpt = document.createElement('option');
        navOpt.textContent = currCode;
        navOpt.value = currCode;
        if (select.name === 'from' && currCode === 'USD') {
            navOpt.selected = 'selected';
        } else if (select.name === 'to' && currCode === 'INR') {
            navOpt.selected = 'selected';
        }
        select.append(navOpt);
    }

    select.addEventListener('change', (event) => {
        updateCountryFlag(event.target);
    })

}

let updateCountryFlag = (element) => {
    let curCode = element.value;
    let country = countryList[curCode];
    let newSrc = `https://flagsapi.com/${country}/flat/64.png`;
    let img = element.parentElement.querySelector('img');
    img.src = newSrc;
}


action.addEventListener('input', async (event) => {
    event.preventDefault();
    let amount = document.querySelector('form input');
    let amtValue = amount.value;
    if (amtValue === '' || amtValue < 0) {
        amtValue = 1;
        amount.value = '1';
    }
    const URL = `${baseUrl}/${fromCurr.value.toLowerCase()}.json`;

    // ${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()]; // e.g. data1['usd']
    let toCurrency = toCurr.value.toLowerCase(); // e.g. 'kmf'
    let finalRate = rate[toCurrency];

    result.textContent = finalRate;
    result.style.fontWeight = "bold"
    result.style.borderWidth = "3px"
    result.style.borderStyle = "solid"
    result.style.borderColor = "lightgray"
    result.style.color = "red"
    result.style.borderRadius = "10px"
    result.style.padding = "3px"


    let finalAmt = amtValue * finalRate;
    // if (rate && rate[toCurrency] !== undefined) {
    //   let rate1 = rate[toCurrency];
    //   console.log(rate1);
    // } 
    // let rate1 = data1[fromCurr.value.toLowerCase()];
    // for(let row in rate1){
    //     console.log(row, rate1[row]);
    // }
    // let rate = data[toCurr.value.toLowerCase()]
    let change = `${amtValue} "${fromCurr.value}" = ${finalAmt} "${toCurr.value}"`;
    msg.textContent = change;
    msg.style.fontSize = '15px';
    msg.style.fontWeight = 'bold'
    msg.style.color = '#ffffff';

})

// btn.addEventListener('click', async (event) => {
//     event.preventDefault();
//     let amount = document.querySelector('form input');
//     let amtValue = amount.value;
//     if (amtValue === '' || amtValue < 0) {
//         amtValue = 1;
//         amount.value = '1';
//     }
//     const URL = `${baseUrl}/${fromCurr.value.toLowerCase()}.json`;

//     // ${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}
//     let response = await fetch(URL);
//     let data = await response.json();
//     let rate = data[fromCurr.value.toLowerCase()]; // e.g. data1['usd']
//     let toCurrency = toCurr.value.toLowerCase(); // e.g. 'kmf'
//     let finalRate = rate[toCurrency];


//     let finalAmt = amtValue * finalRate;
//     // if (rate && rate[toCurrency] !== undefined) {
//     //   let rate1 = rate[toCurrency];
//     //   console.log(rate1);
//     // } 
//     // let rate1 = data1[fromCurr.value.toLowerCase()];
//     // for(let row in rate1){
//     //     console.log(row, rate1[row]);
//     // }
//     // let rate = data[toCurr.value.toLowerCase()]
//     let change = `${amtValue} "${fromCurr.value}" = ${finalAmt} "${toCurr.value}"`;
//     msg.textContent = change;
//     msg.style.fontSize = '15px';
//     msg.style.fontWeight = 'bold'

// });