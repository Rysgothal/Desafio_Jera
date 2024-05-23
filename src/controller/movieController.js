
const { database } = require('../database/database.js'); 
const { getHashMD5, isEmail } = require('../helpers/stringHelper.js');

class moviesController {
    constructor () {
        this.initDatabase();
    };

    initDatabase = async () => {
        await database().init();
        this.datasource = database().getDatasource();
        this.accountTable = this.datasource.getRepository("userAccount");
        this.profileTable = this.datasource.getRepository("userProfile");
    };

    getReqBodyToAccountJSON = (body) => {
        const accountJSON = {
            nameUser: body.nameUser,
            // profileName: body.profileName,
            // userCpf: body.userCpf,
            email: body.email,
            password: getHashMD5(body.password),
            birthDate: body.birthDate,
        };

        return accountJSON;
    };

    checkEmailAlreadyExists = async (email) => {
        return await this.accountTable
            .findOne({ where: { email: email } })
            .then((account) => {
                return (account !== null);
            });
    };

    createMainProfile = async (profile) => {
        this.profileTable
            .save(profile)
            .then((profile) => {
                console.log("Perfil criado com sucesso...", profile);
            });    
    };

    getReqBodyToProfileJSON = (body) => {
        const profileJSON = {
            profileName: body.nameUser,
            idAccount: body.idAccount,
            mainProfile: body.mainProfile,
        };

        return profileJSON;
    }

    checkAccountAlreadyExistis = async (idAccount) => {
        return await this.accountTable
            .findOne({ where: { id: idAccount } })
            .then((profile) => {
                return (profile !== null);
            });
    };

    createProfile = async (req, res) => {
        const newProfile = this.getReqBodyToProfileJSON(req.body);

        if (!this.checkAccountAlreadyExistis(newProfile.idAccount)) {
            console.log("A conta não existe...");

            res.status(404).json({
                message: "A conta não existe...",
                code: 404
            }).end();

            return;
        };
        
        if ( newProfile.mainProfile && await this.profileTable.findOne({ where: { mainProfile: true } }) !== null) {
            console.log("Perfil principal já existe...");

            res.status(404).json({
                message: "Perfil principal já existe...",
                code: 404
            }).end();

            return;
        }

        this.profileTable
            .save(newProfile)
            .then((profile) => {
                console.log("Perfil criado com sucesso...", profile);

                res.status(201).json({
                    message: "Perfil criado com sucesso...",
                    code: 201,
                    profile: profile
                }).end();
            })
            .catch((error) => {
                console.log("Inconsistência ao criar perfil...", error);

                res.status(404).json({
                    message: "Inconsistência ao criar perfil...",
                    code: 404,
                    error: error
                }).end();
            });
    };

    createAccount = async (req, res) => {
        const newAccount = this.getReqBodyToAccountJSON(req.body);
        console.log("Requisição de criação de conta recebida: ", newAccount);

        if (await this.checkEmailAlreadyExists(newAccount.email)) {
            console.log("Email já cadastrado...");

            res.status(404).json({
                message: "Email já cadastrado...",
                code: 404
            }).end();

            return;
        };

        if (isEmail(newAccount.email) === false) {
            console.log("Email inválido...");

            res.status(404).json({
                message: "Email inválido...",
                code: 404
            }).end();
            
            return;
        };

        this.accountTable
            .save(newAccount)
            .then((account) => {
                console.log("Conta criada com sucesso...", account);

                res.status(201).json({
                    message: "Conta criada com sucesso...",
                    code: 201,
                    account: account
                }).end();

                const profile = {
                    profileName: account.nameUser,
                    idAccount: account.id,
                    mainProfile: true
                };
                
                this.createMainProfile(profile);
            })
            .catch((error) => {
                console.log("Inconsistência ao criar conta...", error);

                res.status(404).json({
                    message: "Inconsistência ao criar conta...",
                    code: 404,
                    error: error
                }).end();
            });
    };
};

module.exports = {
    moviesController
};