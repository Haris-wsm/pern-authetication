const app = require('./src/app');
const sequelize = require('./src/database/config');

sequelize.sync();

app.listen(process.env.PORT || 5000, () => console.log(`server is running..`));
