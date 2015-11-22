# Galway Tourist Information
** by Patryk Piecha **

This project will give users (Toursists as well as families living in County Galway) information about playgrounds and beach lifeguard service locations in County Galway.

## Datasets used
The datasets that I am going to use are:

  - Playgrounds County Galway - http://data.galwaycoco.opendata.arcgis.com/datasets/d5d7885b049d489fa9b8e5339488c1df_0.csv
  - Beach Lifeguard Service Locations - http://data.galwaycoco.opendata.arcgis.com/datasets/c2d83f3c2c014347b06caf98031eddb3_0.csv

Both of these datasets are from data.gov.ie

## How to Use the API in command prompt
In command prompt run the app.js file. The things you will need to have installed are:

- express
- body-parser
- fs
- sqlite3

When you run the app, it will show the menu as shown below:
![alt tag](http://i.imgur.com/ELNUS7O.jpg)

Use the on screen menu and follow instruction in order to Add a Playground or a Beach in command prompt, as well as to check which areas contain Playgrounds and Beaches.

## How to Use the API in Browser
After you run the app.js file in Commant Prompt you will be able to use the browser API.

Go to http://127.0.0.1:8000/allplaygrounds in order to view all the playgrounds, as shown below.
![alt tag](http://i.imgur.com/5geCeMp.jpg)

Go to http://127.0.0.1:8000/allbeaches in order to view all the beaches, as shown below.
![alt tag](http://i.imgur.com/HN2ijDI.jpg)

Go to http://127.0.0.1:8000/area/tuam (where tuam is an example of an area) in order to view all the attractions in that area, as shown below.
![alt tag](http://i.imgur.com/L0ulX3s.jpg)

The browser API also enables you to remove any playgrounds or beaches in certain Area. 
Go to http://127.0.0.1:8000/deleteplayground/tuam (where tuam is an example of an area) in order to delete all the playgrounds in tuam, as shown below.
![alt tag](http://i.imgur.com/idaz5qM.jpg)

Go to http://127.0.0.1:8000/deletebeach/oranmore (where oranmore is an example of an area) in order to delete all the beaches in oranmore, as shown below.
![alt tag](http://i.imgur.com/3hQBNMh.jpg)





