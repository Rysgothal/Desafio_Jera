
const typeorm = require('typeorm');
const path = require('path');
let datasource = null;              

const database = () => {

    const init = async () => {
        if (datasource !== null) {
            return;
        };

        datasource = new typeorm.DataSource({
            type: "sqlite",
            database: "./db.sqlite",
            synchronize: true,
            entities: [
                require("./entity/userAccount.js"),
                require("./entity/userProfile.js")] 
        });
        
        await datasource.initialize();
    };

    const getDatasource = () => {
        return datasource;
    };

    return {
        init,
        getDatasource
    };
};

module.exports = {
    database
};