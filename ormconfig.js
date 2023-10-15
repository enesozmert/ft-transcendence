module.exports = {
    type: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    username: 'postgres',
    password: 'postgrespw',
    database: 'FtTranscendence',
    entities: ['src/entities/concrete/*.ts'],
    synchronize: true,
}