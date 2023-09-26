
let locationName  = document.querySelector('#loc-name')
let cloudPerTag = document.querySelector('#cloud-pct')
let details = document.querySelectorAll('.display-details > p')
let temp = document.querySelector('#temp')
let sunrise = document.querySelector('#sunrise')
let sunset = document.querySelector('#sunset')

const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=';
const options = {
    headers: {
        'X-RapidAPI-Key': 'd765ef7745msh2d842537dec8bcap1d71b3jsnd129ae43a51c',
        'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
    }
};




// ! showing data
let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'fri', 'Sat']
let months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
async function showDateTime() {
    let time = document.querySelector('#time')
    let Maindate = document.querySelector('#date')
    setInterval(async () => {
        let cts = Date.now()//current time stamp
        let cuts = Math.floor(cts / 1000)// current unix time stamp
        time.innerText = await convertUnixTimestamp(cuts)

        //days
        let day = new Date()
        let date = day.getDate()
        let month = day.getMonth()
        let dayName = day.getDay()
        Maindate.innerText = days[dayName] + ',' + date + ' ' + months[month]
    }, 1000);

}
showDateTime()
let search = document.querySelector('#search')
let city;
let btn = document.querySelector('#btn')
btn.addEventListener('click',async () => {
    city = search.value
    locationName.innerText = city
    search.value = ''
     await test()
})
// ! showing data end
async function test() {

    try {

        const response = await axios.get(url + city, options);

        if (response.data.cloud_pct > 90 && response.data.cloud_pct <= 100) {
            cloudPerTag.innerText = `Cloud-pct ${response.data.cloud_pct}% , Overcast`;
            //! write a image show condtion by  cloud ptc start with day and night 

            //! write a image show condtion by  cloud ptc end
        } else if (response.data.cloud_pct > 50 && response.data.cloud_pct <= 90) {
            cloudPerTag.innerText = `Cloud-pct ${response.data.cloud_pct}% , Mostly Cloudy`
        } else if (response.data.cloud_pct > 10 && response.data.cloud_pct <= 50) {
            cloudPerTag.innerText = `Cloud-pct ${response.data.cloud_pct}% , Partly Cloudy`
        } else if (response.data.cloud_pct >= 0 && response.data.cloud_pct <= 10) {
            cloudPerTag.innerText = `Cloud-pct ${response.data.cloud_pct}% , Clear Skies`
        }
        temp.innerText = `${response.data.temp}°C`
        details[0].innerText = `Feels-like : ${response.data.feels_like}°C`
        details[1].innerText = `Humidity : ${response.data.humidity}%`
        details[2].innerText = `Min-temp : ${response.data.min_temp}°C`
        details[3].innerText = `Max-temp : ${response.data.max_temp}°C`
        details[4].innerText = `Wind-speed : ${response.data.wind_speed} km/h`
        details[5].innerText = `Wind-degrees : ${response.data.wind_degrees}°`
        const sunriseTime = await convertUnixTimestamp(response.data.sunrise);
        const sunsetTime = await convertUnixTimestamp(response.data.sunset);
        sunrise.innerText = `${sunriseTime}`
        sunset.innerText = `${sunsetTime}`
        console.log(response.data);

    } catch (error) {
        console.error(error);
    }
}
// test()
async function convertUnixTimestamp(timestamp) {
    const date = new Date(timestamp * 1000); // Convert to milliseconds
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const seconds = "0" + date.getSeconds();
    return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
}


/* let unix_timestamp = 1549312452
// Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds.
var date = new Date(unix_timestamp * 1000);
// Hours part from the timestamp
var hours = date.getHours();
// Minutes part from the timestamp
var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
var seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

console.log(formattedTime); */
