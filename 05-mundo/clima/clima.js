const axios = require('axios');
const apiKey = '32f843d833c38373032f825c4a92418a';

const getClima = async(lat, lng) => {
    const resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`);
    return resp.data.main.temp;
}

module.exports = {
    getClima
}