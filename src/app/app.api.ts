/* endereço do nosso backend mocado json server, ativá-lo com:

// json-server db.json
export const MEAT_API = 'http://localhost:3000'

dessa maneira acima não estamos usando variavel de ambiente
*/

import {environment} from '../environments/environment'

export const MEAT_API = environment.api