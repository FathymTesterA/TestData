const apiUrl = `/api/iot-ensemble/WarmQuery?includeEmulated=false`

const fetchData = () => {
    fetch(apiUrl)
        .then( (data) => {
            if(data.ok){
                return data.json()
            }
            throw new Error('Response not ok.'); 
        })
        .then( dataPack => generateHtml(dataPack))
        .catch( error => console.error('Error:', error));
};


const generateHtml = (data) => {
    //console.log(data)
    //console.log(data.Payloads)
    const myArr = data.Payloads;
    
    const html = [`<div class="details">`];

    var sensorReadingKeys = Object.keys(myArr[0].SensorReadings || {});

    sensorReadingKeys.forEach(srKey => html.push(`<div><strong>${srKey}</strong>: ${myArr[0].SensorReadings[srKey]}</div>`));

    html.push('</div>');

    const dataDiv = document.querySelector('.dataReadings');

    dataDiv.innerHTML = html.join('');
}

setInterval(() => {
    fetchData();
}, 15000);

fetchData();
