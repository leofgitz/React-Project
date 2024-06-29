import {Sequelize} from 'sequelize';

const sequelize = new Sequelize('aluavaldb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default sequelize;

