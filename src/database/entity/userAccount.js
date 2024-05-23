
const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "userAccount",               
    tableName: "account",   
    columns: {
        id: {
            primary: true,
            type: "integer",
            generated: true,
        },
        nameUser: {
            type: "varchar",
            nullable: false,
        },
        // profileName: {
        //     type: "varchar",
        //     unique: true,
        // },   
        // userCpf: {
        //     type: "varchar",
        //     length: 14,
        //     nullable: false,
        //     unique: true,
        // },
        email: {
            type: "varchar",
            nullable: false,
        },
        password: {
            type: "varchar",
            nullable: false,
        },
        birthDate: {
            type: "date",
            nullable: false,
        },
    },
})
