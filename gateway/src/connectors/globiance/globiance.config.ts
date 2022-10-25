import { ConfigManagerV2 } from '../../services/config-manager-v2';
import { AvailableNetworks } from '../../services/config-manager-types';

export namespace GlobianceConfig {
  export interface NetworkConfig {
    allowedSlippage: string;
    gasLimitEstimate: number;
    ttl: number;
    routerAddress: (network: string) => string;
    tradingTypes: Array<string>;
    availableNetworks: Array<AvailableNetworks>;
  }

  export const config: NetworkConfig = {
    allowedSlippage: ConfigManagerV2.getInstance().get('globiance.allowedSlippage'),
    gasLimitEstimate: ConfigManagerV2.getInstance().get('globiance.gasLimitEstimate'),
    ttl: ConfigManagerV2.getInstance().get('globiance.ttl'),
    routerAddress: (network: string) => ConfigManagerV2.getInstance().get('globiance.contractAddresses.' + network + '.routerAddress'),
    tradingTypes: ['EVM_AMM'],
    availableNetworks: [{ chain: 'xdc', networks: ['xinfin', 'apothem'] }],
  };
}
