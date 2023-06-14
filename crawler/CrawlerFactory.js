let {Crawler} = require("./Crawler.js");

class CrawlerFactory {
    constructor() {
        // map a crawl job process to a given job it -- will be read from rabbit
        this.crawlers = new Map();
    }

    createCrawler(job_id, contract_address, token_ids) {
        console.log(`Creating crawler for job: ${job_id} -- ${contract_address} -- ${token_ids}`);
        const crawler = new Crawler(job_id, contract_address, token_ids);
        this.crawlers.set(job_id, crawler)
        return crawler;
    }

    startCrawlers() {
        this.crawlers.forEach((crawler) => {
            crawler.start();
        });
    }

    getCrawlers() {
        return this.crawlers;
    }
}

module.exports.CrawlerFactory = CrawlerFactory;