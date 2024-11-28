# Weather Condition Map

This full-stack project visualize real-time/past position and weather data by Google Map SDK and Echarts, and it is the final assignment of the Urban Computing module in Trinity College Dublin.

## Tech Stack
- Frontend: Vite, React.js, Material UI, Echarts
- Backend: Google Firebase Real-time database, Express, Node.js
- Data Analysis: pandas and sklearn in Python

## How to Run
First, pull the repo to your own laptop:

```bash
git clone https://github.com/RookieTerry/WeatherConditionMap-Frontend.git WeatherConditionMap-Frontend
```

Install the dependencies by using the command:

```bash
npm install
```

Before running the project, do not forget to configure the `.env.local` file in the root directory, and it should look like:

```
VITE_OPEN_WEATHER_KEY=xxxxxx
VITE_GOOGLE_MAPS_KEY=xxxxxx
VITE_GOOGLE_MAPS_ID=xxxxxx
VITE_BACKEND_URL=http://localhost:5000
```

Replace the "xxxxxx" into yours, and check the `vite.config.js` file as well. 

Execute the command:

```bash
npm run dev
```

The project should be ready to go. Enjoy!

## To-do List

- [ ] display current weather condition of current position
- [ ] predict future weather condition
- [x] deploy this web application on the cloud (e.g. Heroku, Vercel)
