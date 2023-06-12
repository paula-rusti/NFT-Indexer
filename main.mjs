import {TokenRepository} from "./repository/TokenRepository.js";

let t = new TokenRepository();
t.createTableIfNotExists();