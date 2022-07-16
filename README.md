# Weather-App.

<img width="1280" alt="Screen Shot 2022-07-10 at 3 23 00 PM" src="https://user-images.githubusercontent.com/98048059/178163543-46744f72-481c-4158-89a3-836f1ac8bcd8.png">

https://gribbler25.github.io/weather-app/

## Languages and tools Used:

HTML,CSS, Javascript, Jquery, Bootstrap, moment.js, One Call weather API

## Project Description:

This app was created to allow a user to quickly check current weather conditions and

UV index rating to better plan for their day. It also is meant to allow user to see

future conditions for the search city. It also saves immediate search histories for re-searching past cities.

## Some of the challenges I faced:

1. Getting the dynamic local storage values into an array that i could loop over for the buttons was challenging and I still haven't figured out what will fix the problem of the buttons re-creating redundantly when a saved city button is pressed.

- Update: after refactoring some code by making a separate function for creating buttons that also calls upon load, and an if statement in the main search function to filter out cities that are already in the local storage array, I finally got the buttons only creating 1 time per city even when pressed multiple times.

2. I was very close to getting a for loop to work for populating the child elements of the <ul> in each unique data-id'd <ul>, but javascript was not allowing the value of the data-id to be changed properly by the 'i' value the way i expressed it in the loop. So I hard-coded the 1st futurecast day to demontrate function.

- Update: After learning how to use template literals as a way to express the value of the data-id's in the for loop I got the weather data to display on all 5 days.
