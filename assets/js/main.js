const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const inputValue = $('.city-name')
// const inputContinents = $('.continents')
const city = $('.city')

const country = $('.country')
const time = $('.time')
const temperatureNumber = $('.temperature-number')
const textStatus = $('.text-status')
const viewText = $('.view-text')
const windText = $('.wind-text')
const cloudText = $('.cloud-text')
const humidityText = $('.humidity-text')
function loadData(){
	let nameCity = inputValue.value === '' ? 'Bac Ninh' : inputValue.value;
	// let nameContinents = inputContinents.value === '' ? 'Asia' : inputContinents.value;

	const API = `https://api.openweathermap.org/data/2.5/weather?q=${nameCity}&units=metric&appid=d78fd1588e1b7c0c2813576ba183a667`
	fetch(API)
	.then(response => {
		return response.json()
	})
	.then(items => {
		city.innerHTML = items.name
		country.innerHTML = items.sys.country
		temperatureNumber.innerHTML =	Math.trunc(items.main.temp)
		textStatus.innerHTML = items.weather[0].description
		windText.innerHTML = 	items.wind.speed + ' (m/s)'
		humidityText.innerHTML = items.main.humidity + ' %'
		cloudText.innerHTML = 	items.clouds.all + ' %'
		var sliceTime = new Date()
		const month = sliceTime.getMonth() < 10 ?  ('0' + (sliceTime.getMonth() + 1)) : (sliceTime.getMonth() + 1)
		const hour = sliceTime.getHours() < 10 ?  ('0' + (sliceTime.getHours())) : (sliceTime.getHours())
		const minutes = sliceTime.getMinutes() < 10 ?  ('0' + (sliceTime.getMinutes())) : (sliceTime.getMinutes())
		const seconds = sliceTime.getSeconds() < 10 ?  ('0' + (sliceTime.getSeconds())) : (sliceTime.getSeconds())
		const date = sliceTime.getDate() < 10 ?  ('0' + (sliceTime.getDate())) : (sliceTime.getDate())
		time.innerHTML = hour + ':' + minutes + ':' + seconds + ',   '  + date + '/' 	+ month  + '/' + sliceTime.getFullYear()
	})
	.catch(err => {
		console.error(err);
	});
	// fetch(`http://worldtimeapi.org/api/timezone/${nameContinents}/${nameCity}`)
	// .then(response => {
	// 	return response.json()
	// })
	// .then((item) => {
	// 	var timeAll = item.datetime
	// 	console.log(timeAll);
		
	// })
	// .catch(err => {
	// 	console.error(err);
	// });

}
loadData()
inputValue.addEventListener("keypress", (e) => {
		if(e.code === 'Enter') {
			loadData()
			
		}
})
const buttonMode = $('.button-mode')
const app = {
	isChange: true,
	modeHandle(){
		buttonMode.onclick = () => {
			if(app.isChange === true){
				// sang 
				buttonMode.classList.add('light-bgr-app');
				$('.button-mode-item').classList.add('light-item');
				$('.app').classList.add('app-light')
				$('html').style.color = 'black'
				$('.input-item').classList.add('input-light')
				$('.main').classList.add('light-bgr')
				$('.text-mode').innerHTML = 'Light Mode'
				app.isChange = false
			}
			else {
				// toi 
				$('.button-mode.light-bgr-app').classList.remove('light-bgr-app')
				$('.button-mode-item.light-item').classList.remove('light-item')
				$('.app.app-light').classList.remove('app-light')
				$('.input-item.input-light').classList.remove('input-light')
				$('html').style.color = 'white'
				$('.main.light-bgr').classList.remove('light-bgr')
				$('.text-mode').innerHTML = 'Dark Mode'

				app.isChange = true
			}
		
		}
	}
}
app.modeHandle()




