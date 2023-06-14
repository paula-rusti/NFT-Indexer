const connection_string = "postgresql://nft:nft@localhost:5432/nft"

class JobRepository {
    constructor() {
        // this.client = new DatabaseClient();
        if (!JobRepository.instance) {
            this.client = require('knex')({
                client: 'pg',
                connection: connection_string, // process.env.PG_CONNECTION_STRING,
                searchPath: ['knex', 'public'],
            });
            JobRepository.instance = this;
        } else {
            return JobRepository.instance;
        }

    }

    getRepository() {
        return this.instance;
    }

    async createTableIfNotExists() {
        const tableExists = await this.client.schema.hasTable('jobs');
        if (!tableExists) {
            await this.client.schema.createTable('jobs', (table) => {
                table.increments('id').primary();
                table.string('job_id').notNullable();
                table.string('target_contract').notNullable();
                table.integer('num_tokens').notNullable();
                table.string('status').notNullable();
                table.timestamp('created_at').defaultTo(this.client.fn.now());
            });
            console.log("Job table created successfully")
        } else {
            console.log("Job table already exists")
        }
    }

    async insertJobStatus(job_status) {
        try {
            await this.client('jobs').insert(job_status);
        } catch (error) {
            throw new Error('Error inserting job_status: ' + error.message);
        }
    }
}

module.exports.JobRepository = JobRepository;