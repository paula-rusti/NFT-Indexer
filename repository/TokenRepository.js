
class TokenRepository {
    constructor() {
        // this.client = new DatabaseClient();
        if (!TokenRepository.instance) {
            this.client = require('knex')({
                client: 'pg',
                connection: process.env.PG_CONNECTION_STRING,
                searchPath: ['knex', 'public'],
            });
            TokenRepository.instance = this;
        } else {
            return TokenRepository.instance;
        }

    }

    getRepository() {
        return this.instance;
    }

    async createTableIfNotExists() {
        const tableExists = await this.client.schema.hasTable('tokens');
        if (!tableExists) {
            await this.client.schema.createTable('tokens', (table) => {
                table.increments('id').primary();
                table.string('token_id').notNullable();
                table.timestamp('created_at').defaultTo(this.client.fn.now());
            });
            console.log("Token table created successfully")
        } else {
            console.log("Token table already exists")
        }
    }
}

module.exports.TokenRepository = TokenRepository;
// todo freeze object to make it a true singleton