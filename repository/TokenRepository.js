const connection_string = "postgresql://nft:nft@localhost:5432/nft"

class TokenRepository {
    constructor() {
        // this.client = new DatabaseClient();
        if (!TokenRepository.instance) {
            this.client = require('knex')({
                client: 'pg',
                connection: connection_string, // process.env.PG_CONNECTION_STRING,
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

    // todo add contract address to token table
    async createTableIfNotExists() {
        const tableExists = await this.client.schema.hasTable('tokens');
        if (!tableExists) {
            await this.client.schema.createTable('tokens', (table) => {
                table.increments('id').primary();
                table.string('token_id').notNullable();
                table.string('name').notNullable();
                table.string('description').notNullable();
                table.timestamp('created_at').defaultTo(this.client.fn.now());
            });
            console.log("Token table created successfully")
        } else {
            console.log("Token table already exists")
        }
    }

    async insertToken(token) {
        try {
            await this.client('tokens').insert(token);
        } catch (error) {
            throw new Error('Error inserting token: ' + error.message);
        }
    }
}

module.exports.TokenRepository = TokenRepository;
// todo freeze object to make it a true singleton