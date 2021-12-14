var APIKey = "e50a9964c6b336823479348f4ccbea43";
var city;
var weather_api_city_url = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+APIKey;
var latitude;
var longitude;
var current_time;
var current_date;

var display_box = $('#display_box');

var full_display_box = $('#full_display_box');


load_city_data("seattle");



function load_city_data(input_city) { 
    //city = 'seattle';

    //input_city = $("#search_input").text();

    city = input_city;
    console.log(input_city);
    

    weather_api_city_url = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+APIKey;
    $.ajax({
        url: weather_api_city_url,
        dataType: 'json',
        success: function(data) {
            //console.log(data.coord.lat,data.coord.lon);
            latitude = data.coord.lat;
            longitude = data.coord.lon;
            current_time = data.dt;
            //console.log(latitude,longitude,current_time);
            city = data.name;
            console.log(data);
            


            current_time = current_time * 1000;
            current_date = new Date(current_time); // The 0 there is the key, which sets the date to the epoch


            var dd = String(current_date.getDate()).padStart(2, '0');
            var mm = String(current_date.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = current_date.getFullYear();


    
            var formatted_date = mm + '/' + dd + '/' + yyyy;
            var date_tomorrow = mm + '/' + (parseInt(dd) + 1) + "/" + yyyy;

            //console.log(city + " (" + formatted_date + ")");
            //console.log(date_tomorrow);



        var weather_api_url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude+'&exclude=hourly,minutely&units=imperial&appid='+APIKey;

        $.ajax({
            url: weather_api_url,
            dataType: 'json',
            success: function(data) {
            console.log(data);

            //console.log("today's current temp in "+city+"\ "+data.current.temp+'F°');
            //console.log("tomorrow's avg temp in "+city+": "+data.daily[1].temp.day+'°F');


            //console.log(data.current.weather.icon);
            var img = document.createElement("img");
            var city_name_header = $('<h1 id=current_day_header>' + city + " (" + formatted_date + ")" + '</h1>');




            var newRow = $('<li id="rowHeader" class="row"></li>');


            img.src = "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png";
            console.log("http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png");

            img.style.width = '78px';
            img.style.height = '78px';
            img.style.margin = '0px';
            $(newRow).append(city_name_header);
            $(newRow).append(img);

            var tempRow = $('<li class="row">Temp: ' + data.current.temp + '°F</li>');
            var windRow = $('<li class="row">Wind: ' + data.current.wind_speed + ' MPH</li>');
            var humidityRow = $('<li class="row">Humidity: ' + data.current.humidity + '%</li>');
            var uvIndexRow = $('<li class="row">UV Index:</li>');
            

            if (data.current.uvi < 3) {
                var uvColorDiv = $('<div id="favorable">' + data.current.uvi + '</div>');

            }

            if ( (data.current.uvi >= 3) && (data.current.uvi <= 5)) {
                var uvColorDiv = $('<div id="moderate">' + data.current.uvi + '</div>');

            }

            if (data.current.uvi > 5) {
                var uvColorDiv = $('<div id="severe">' + data.current.uvi + '</div>');

            }






            $(display_box).append(newRow);
            $(display_box).append(tempRow);
            $(display_box).append(windRow);
            $(display_box).append(humidityRow); 
            $(uvIndexRow).append(uvColorDiv);   
            $(display_box).append(uvIndexRow);


            $(full_display_box).append(display_box);
            

            var five_day_header = $('<h2>5 Day Forecast:</h2>');
            $(full_display_box).append(five_day_header);



            var five_image_list = [];
            var five_day_forecast_box = $('<div id="five_day_box" class="row"></div>');
            //var date_box = $('<li id="date_box"class="row"></li>');

            $(data.daily).each(function (index) {


                let five_day_date;
                let fiveTempRow;
                let fiveWindRow;
                let fiveHumidityRow; 

                if ((index < 6) && (index > 0)) {


                    formatted_date = mm + '/' + (parseInt(dd) + index) + "/" + yyyy;

                    five_day_date = $('<li class="row">'+formatted_date+'</li>');
                    fiveTempRow = $('<li class="row">Temp: ' + data.daily[index].temp.day + '°F</li>');
                    fiveWindRow = $('<li class="row">Wind: ' + data.daily[index].wind_speed + ' MPH</li>');
                    fiveHumidityRow = $('<li class="row">Humidity: ' + data.daily[index].humidity + '%</li>');



                    let date_box = $('<li class="col-sm dateBox"></li>');




                    five_image_list[index] = document.createElement("img");
                    five_image_list[index].src = "http://openweathermap.org/img/wn/" + data.daily[index].weather[0].icon + "@2x.png";
            
                    five_image_list[index].style.width = '39px';
                    five_image_list[index].style.height = '39px';
                    five_image_list[index].style.margin = '0px';







                    $(date_box).append(five_day_date);
                    $(date_box).append(five_image_list[index]);
                    $(date_box).append(fiveTempRow);
                    $(date_box).append(fiveWindRow);
                    $(date_box).append(fiveHumidityRow);


                    $(five_day_forecast_box).append(date_box);


                    console.log(index + " days from now in " + city + ": " + data.daily[index].temp.day+'°F');
                }
            });
            $(full_display_box).append(five_day_forecast_box);
            }
        });
        }
    });
}




$("#search_button").click(function() {
    load_city_data("atlanta");
});


