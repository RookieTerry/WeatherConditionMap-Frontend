# Weather Condition Map

This full-stack project visualize real-time/past position and weather data by Google Map SDK and Echarts, and it is the final assignment of the Urban Computing module in Trinity College Dublin.

## Tech Stack
- Frontend: Vite, React.js, Material UI, Echarts
- Backend: Google Firebase Real-time database, Express, Node.js
- Data Analysis: pandas and sklearn in Python

## How to Run
First, pull the repo to your own laptop:

```bash
git clone https://gitlab.scss.tcd.ie/zhangt8/weatherconditionmap.git WeatherConditionMap
```

You can see the directories named `frontend` and `backend` respectively. Install their dependencies separately, by using the command:

```bash
npm install
```

Before running the project, do not forget to configure the `.env.local` file in the root directory of both `frontend` and `backend`. The `.env.local` file of frontend should look like:

```
VITE_OPEN_WEATHER_KEY=xxxxxx
VITE_GOOGLE_MAPS_KEY=xxxxxx
VITE_GOOGLE_MAPS_ID=xxxxxx
VITE_BACKEND_URL=http://localhost:5000
```

Similarly, the `.env.local` file of backend should look like:

```
PORT=5000
OPENWEATHER_API_KEY=xxxxxx
FIREBASE_APP_ID=xxxxxx
FIREBASE_PROJECT_ID=xxxxxx
FIREBASE_DATABASE_URL=xxxxxx
```

Replace the "xxxxxx" into yours, and check the `vite.config.js` file in the `frontend` directory as well. You also need to add your own `serviceAccountKey.json` from your Google Firebase console.

Enter the `backend` first, and execute the command:

```bash
npm start
```

You should see the output `App listening on port 5000`. Similarly, enter the `frontend` directory and execute the command:

```bash
npm run dev
```

The project should be ready to go. Enjoy!

## To-do List

- [ ] display current weather condition of current position
- [ ] predict future weather condition
- [x] deploy this web application on the cloud (e.g. Heroku, Vercel)
