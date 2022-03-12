import { PowerShell } from 'full-powershell'
import BasePlugin from '@appium/base-plugin'

export default class ProcessStatusPlugin extends BasePlugin {
    static newMethodMap = {
        'process/:processId': {
          GET: {
            command: 'getProcessResponding'
          }
        },
    };
    
    async getProcessResponding(next, driver) {
      let res = ps.getProcessStatus()
      
      return result = (res.error.length > 0) ?
          {error: res.error[0]} : (res.success.length > 0) ?
            {success: res.success[0]} : {};
    }

    async getProcessStatus() {
      let powershell = new PowerShell();

      return await powershell.call('(Get-Process -Name notepad).Responding', 'json').promise();
  }
}

export {ProcessStatusPlugin}