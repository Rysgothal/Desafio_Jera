
const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "userProfile",               
    tableName: "profile",   
    columns: {
        id: {
            primary: true,
            type: "integer",
            generated: true,
        },
        profileName: {
            type: "varchar",
            nullable: false,
        },
        idAccount: {
            type: "integer",
            nullable: false,
        },
        mainProfile: {
            type: "boolean",
            nullable: false,
        },
    },
    
    relations: { 
        account: { 
            type: "many-to-one", 
            target: "account", 
            joinColumn: { 
                name: "idAccount", 
                referencedColumnName: "id"
            }
        }
    }
})
