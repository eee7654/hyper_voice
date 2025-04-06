const { Model } = require('objection')
const db = require('../core/database')

class Device extends Model {

    static get tableName() {
        return 'devices'
    }

    static get idColumn() {
        return ['id']
    }

    static get jsonSchema () {
        return {
            type: 'object',
            required: ['device_name','last_ip'],
            properties: {
                device_name: {type:'integer'},
                last_ip: {type: 'string'},
                alarm_file:{type:'string'},
                created_at:{type:'integer'},
                updated_at:{type:'integer'},
                is_deleted:{type:'integer'}
            }
        };
    }
 
}

Device.knex(db())

module.exports = Device