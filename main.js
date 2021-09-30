const apiUrl = `/api/iot-ensemble/WarmQuery?includeEmulated=false`

setInterval(() => {
    fetchData();
}, 15000);

fetchData();

const fetchData = () => {
    fetch(apiUrl)
        .then( (data) => {
            if(data.ok){
                return data.json()
            }
            throw new Error('Response not ok.'); 
        })
        .then( dataPack => generateHtml(dataPack))
        .catch( error => console.error('Error:', error))
};


const generateHtml = (data) => {
    //console.log(data)
    //console.log(data.Payloads)
    const myArr = data.Payloads
    //console.log(myArr[0].SensorReadings.humidity)
    //console.log(myArr[0].SensorReadings.tempf)
    const html = `
        <div class="details">
            <span>Humidity: ${myArr[0].SensorReadings.humidity}%</span><br />
            <span>Temp &#176;F: ${myArr[0].SensorReadings.tempf}</span>
        </div>
    `
    const dataDiv = document.querySelector('.dataReadings')
    dataDiv.innerHTML = html
}