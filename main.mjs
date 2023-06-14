import {TokenRepository} from "./repository/TokenRepository.js";

let t = new TokenRepository();
t.createTableIfNotExists();

// import CrawlerFactoryPkg from "./crawler/CrawlerFactory.js";
// const {CrawlerFactory} = CrawlerFactoryPkg;
//
// let cf = new CrawlerFactory();
// cf.createCrawler(1);
// cf.createCrawler(2);
// cf.startCrawlers()