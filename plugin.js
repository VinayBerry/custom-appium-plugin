const BasePlugin = require('@appium/base-plugin').default;
const fullPowershell = require('full-powershell')

class ProcessStatusPlugin extends BasePlugin {

  static newMethodMap = {
    '/session/:sessionId/process_status': {
      POST: {
        command: 'getProcessResponding',
        neverProxy: true,
        payloadParams: {
          optional: ['processId', 'processName']
        }
      }
    },
  };
  
  async getProcessResponding(next, driver, ...args) {
    let powershell = new fullPowershell.PowerShell();
    let processId = args[0] || 0
    let processName = args[1] || ""
    let command = (processId !== 0) ? `(Get-Process -Id ${processId})[0].Responding` : `(Get-Process -Name ${processName})[0].Responding`
    let res = await powershell.call(command, 'json').promise();
    return (res.error.length > 0) ? {type: 'error', result: res.error[0]} : 
      (res.success.length > 0) ? {type: 'success', result: res.success[0]} : {};
  }
}

module.exports = { ProcessStatusPlugin }