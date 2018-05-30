import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function() {
    $('#weatherLocation').click(function() {
      let city = $('#location').val();
      $('#location').val("");
      $.ajax({
        url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`,
        type: 'GET',
        data: {
          format: 'json'
        },
        success: function(response) {
          $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
          $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp}.`);
          $.ajax({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${process.env.google_key}`,
            type: 'GET',
            data: {
              format: 'json'
            },
            success: function(response) {
              let latitude = response.results[0].geometry.location.lat;
              let longitude = response.results[0].geometry.location.lng;
              // $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
              // $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp}.`);
            },
            error: function() {
              $('#errors').text("There was an error processing your request. Please try again.")
            }
          });
        },
        error: function() {
          $('#errors').text("There was an error processing your request. Please try again.")
        }
      });
    });
  });

  // $(document).ready(function() {
  //   $('#weatherLocation').click(function() {
  //     let city = $('#location').val();
  //     $('#location').val("");
  
  //     let request = new XMLHttpRequest();
  //     let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;
  
  //     request.onreadystatechange = function() {
  //       if (this.readyState === 4 && this.status === 200) {
  //         let response = JSON.parse(this.responseText);
  //         getElements(response);
  //       }
  //     }
  
  //     request.open("GET", url, true);
  //     request.send();
  
  //       let getElements = function(response) {
  //       $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
  //       $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp} degrees.`);
  //     }
  //   });
  // });