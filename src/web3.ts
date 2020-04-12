import EWeb3 from "web3";
import { Block, IDarwiniaEthBlock, IEthBlock } from "./block";
import { log } from "./log";

/**
 * @class Web3 - web3 api wrapper
 *
 * @method getBlock - transfer ring
 *
 * @property {Web3} web3 - raw web3 api
 */
export class Web3 {
    public web3: EWeb3;

    /**
     * init web3 api
     *
     * @param {String} web3 - web3 api http address
     * @param {AddedAccount} priv - private key of ethereum account
     */
    constructor(node: string, priv: string) {
        this.web3 = new EWeb3(new EWeb3.providers.HttpProvider(node));
        this.web3.eth.accounts.wallet.add(priv);
    }

    /**
     * get block by hash | height
     *
     * @param {String | Number} block - the target block
     */
    public async getBlock(block: string | number): Promise<IDarwiniaEthBlock> {
        log.trace(`fetch block ${block} from ethereum...`);
        const eBlock: IEthBlock = await this.web3.eth.getBlock(block);
        const dBlock: Block = Block.from(eBlock);
        return dBlock.toJson();
    }
}