import { Client } from 'pg'
import clientConfig from './clientConfig'

const client = new Client(clientConfig)
client.connect()
console.log('Connected🚀')

export default client
