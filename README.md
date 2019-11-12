# sensor-net

1. Install and save all required packages 
* npm install --save

2. adjust config/config.json to match your database settings

3. set up the tables with:
* npx sequelize db:migrate 

4. add default data to the tables:
* npx sequelize db:seed:all

5. run the server
* **npm start** or **bin/www**

**At this point, the server is receiving sensordata via the mqtt broker. Currently only the temperature sensor is present and logged.**