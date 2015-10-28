# Galway Tourist Information
** by Patryk Piecha **

This project will give users (Toursists as well as families living in County Galway) information about playgrounds and beach lifeguard service locations in County Galway.

## Datasets used
The datasets that I am going to use are:
  1 - Playgrounds County Galway - http://data.galwaycoco.opendata.arcgis.com/datasets/d5d7885b049d489fa9b8e5339488c1df_0.csv
  2 - Beach Lifeguard Service Locations - http://data.galwaycoco.opendata.arcgis.com/datasets/c2d83f3c2c014347b06caf98031eddb3_0.csv

Both of these datasets are from data.gov.ie

## How to Query the API
The sample query for the API to get the list of playgrounds in given areas would be as follows:
*http://countygalwayapi.com/area/[area]*
where the user would replace [area] with one of the following areas:
- North Galway
- West Galway
- East Galway
- South Galway
- Central Galway

The sample query for the API to get the list of beaches with lifegaurd services in given beach would be as follows:
*http://countygalwayapi.com/beach/[beach]*
where the user would replace [beach] with the name of the beach he is planning to go to.


## Example use of the API
The example use of playground URL:
*http://countygalwayapi.com/area/NorthGalway*
will return the list of playgrounds in North Galway area with a JSON format as follows:
  - *location*: Ballygaddy Road Belair Drive, Tuam 
  - *area*: North Galway - Tuam
  - *managed by*: Galway County Council
  - *playground*: Ballygaddy Road Belair Drive, Tuam
  - *age group*: 4-12
  - *equipmen*: Swing – Junior – 1 Bay – 2 Seat
  - *public toilet*: Yes/No
  - *opening hours*: Daylight Hours / 9:00AM - 6:00PM
  - *parking*: Yes/No

An example of a response would be:
    ```json
    [ {"location": "Ballygaddy Road Belair Drive, Tuam", "area": "North Galway", ...}, {...}, ...]
    ```

The example use of beaches lifeguard service locations URL:
*http://countygalwayapi.com/beach/Grattan*
will return a record of a Grattan beach in JSON format as follows:
  - *beach*: Grattan, Salthill 
  - *opening hours*: 11:00-7:00pm. Weekends in June. 7 Days a Week in July and August. Weekends in Sept., until the 15th Sept.
  - *number of Lifeguards*: 2
  - *blue flag*: Yes/No

An example of a respone would be:
    ```json
    [ {"beach": "Grattan", Tuam", "opening hours": "11:00-7:00pm. Weekends in June. 7 Days a Week in July and August. Weekends in Sept., until the 15th Sept.", ...}, {...}, ...]
    ```
