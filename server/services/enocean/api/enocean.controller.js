const asyncMiddleware = require('../../../api/middlewares/asyncMiddleware');
const { ServiceNotConfiguredError, BadParameters } = require('../../../utils/coreErrors');

module.exports = function EnoceanController(gladys, enoceanManager, serviceId) {
  /**
   * @api {post} /api/v1/service/enocean/connect Connect
   * @apiName connect
   * @apiGroup Enocean
   */
  async function connect(req, res) {
    const enoceanDriverPath = await gladys.variable.getValue('ENOCEAN_DRIVER_PATH', serviceId);
    if (!enoceanDriverPath) {
      throw new ServiceNotConfiguredError('ENOCEAN_DRIVER_PATH_NOT_FOUND');
    }
    enoceanManager.connect(enoceanDriverPath);
    res.json({
      success: true,
    });
  }

  /**
   * @api {post} /api/v1/service/enocean/disconnect Disconnect
   * @apiName disconnect
   * @apiGroup Enocean
   */
  async function disconnect(req, res) {
    const enoceanDriverPath = await gladys.variable.getValue('ENOCEAN_DRIVER_PATH', serviceId);
    enoceanManager.disconnect(enoceanDriverPath);
    res.json({
      success: true,
    });
  }

  /**
   * @api {post} /api/v1/service/enocean/teachIn Manual teach in device
   * @apiName learn
   * @apiGroup Enocean
   */
     async function teachIn(req, res) {
      enoceanManager.manualTeachIn(req.body);
      res.json({
        success: true,
      });
    }

    /**
   * @api {post} /api/v1/service/enocean/manualTeachInDevice Emulate button to teach in device
   * @apiName learn
   * @apiGroup Enocean
   */
       async function manualTeachIn(req, res) {
        const device = req.body;
        if (!device.external_id) {
          throw new BadParameters('integration.enocean.error.missingId');
        }
        if (!device.selector) {
          throw new BadParameters('integration.enocean.error.missingProfile');
        }
        enoceanManager.manualTeachIn(req.body);
        res.json({
          success: true,
        });
      }

  /**
   * @api {post} /api/v1/service/enocean/taughtIn Device taught
   * @apiName taughtIn
   * @apiGroup Enocean
   */
  async function taughtIn(req, res) {
    enoceanManager.taughtIn(req.body);
    res.json({
      success: true,
    });
  }


  /**
   * @api {get} /api/v1/service/enocean/info Get Enocean Informations
   * @apiName getInfos
   * @apiGroup Enocean
   */
  async function getInfos(req, res) {
    const infos = enoceanManager.getInfos();
    res.json(infos);
  }

  /**
   * @api {get} /api/v1/service/enocean/status Get Enocean Status
   * @apiName getStatus
   * @apiGroup Enocean
   */
  async function getStatus(req, res) {
    res.json({
      connected: enoceanManager.connected,
      learning: enoceanManager.learning,
      ready: enoceanManager.ready,
    });
  }

    /**
   * @api {get} /api/v1/service/enocean/manuallyTeachableDevices Get devices which can be taught in manually
   * @apiName getManuallyTeachableDevices
   * @apiGroup Enocean
   */
     async function getManuallyTeachableDevices(req, res) {
       const manuallyTeachableDevices = await enoceanManager.getManuallyTeachableDevices();
      res.json(manuallyTeachableDevices);
    }
  

  return {
    'get /api/v1/service/enocean/info': {
      authenticated: true,
      controller: asyncMiddleware(getInfos),
    },
    'get /api/v1/service/enocean/status': {
      authenticated: true,
      controller: asyncMiddleware(getStatus),
    },
    'post /api/v1/service/enocean/connect': {
      authenticated: true,
      controller: asyncMiddleware(connect),
    },
    'post /api/v1/service/enocean/disconnect': {
      authenticated: true,
      controller: asyncMiddleware(disconnect),
    },
    'post /api/v1/service/enocean/taughtIn': {
      authenticated: true,
      controller: asyncMiddleware(taughtIn),
    },
    'post /api/v1/service/enocean/teachIn': {
      authenticated: true,
      controller: asyncMiddleware(teachIn),
    },
    'post /api/v1/service/enocean/manualTeachIn': {
      authenticated: true,
      controller: asyncMiddleware(manualTeachIn),
    },
    'get /api/v1/service/enocean/manuallyTeachableDevices': {
      authenticated: true,
      controller: asyncMiddleware(getManuallyTeachableDevices),
    }
  };
};
