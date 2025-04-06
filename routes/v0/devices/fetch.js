const app = require('../../../core/app');
const { resolveRoutePath } = require('../../../utils/route-resolver');
const Device = require('../../../models/Device')

const route = resolveRoutePath(__filename);

app.get(route, async(req, res) => {
    try {
        const devices = await Device.query().select('*').where('is_deleted',0)
        res.json({
            status:'ok',
            devices
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({status:'internalError',message:error.message})
    }
})