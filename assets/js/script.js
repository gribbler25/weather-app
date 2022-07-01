//  My API key: 5b5c4ddd711eb9c884bd57dd6cff32bd

// example one call weather api call:
//https://api.openweathermap.org/data/2.5/onecall?
//lat=33.44&lon=-94.04&exclude=hourly,daily&appid={API key}

//current weather api call
//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

//5-day api call
//api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

var urlAPI = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}"
fetch(urlAPI);