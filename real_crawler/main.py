import os

import requests
from web3 import Web3

# Infura API key
infura_api_key = os.getenv('INFURA_API_KEY')

# Ethereum network URL
infura_url = f'https://mainnet.infura.io/v3/{infura_api_key}'

# Connect to Infura
web3 = Web3(Web3.HTTPProvider(infura_url))


def get_nft_metadata(contract_address):
    # Get contract ABI from Etherscan
    etherscan_api_key = os.getenv('ETHERSCAN_API_KEY')
    etherscan_url = f'https://api.etherscan.io/api?module=contract&action=getabi&address={contract_address}&apikey={etherscan_api_key}'
    response = requests.get(etherscan_url)
    abi = response.json()['result']

    # Create contract instance
    contract = web3.eth.contract(address=Web3.to_checksum_address(contract_address), abi=abi)

    # Get total supply of tokens
    total_supply = contract.functions.totalSupply().call()

    # Retrieve token metadata
    metadata_list = []
    for token_id in range(total_supply):
        try:
            token_uri = contract.functions.tokenURI(token_id).call()
            response = requests.get(token_uri)
            metadata = response.json()
            print(metadata)
            metadata_list.append(metadata)
        except:
            print(f"Failed to retrieve metadata for token ID: {token_id}")

    return metadata_list


def get_token_metadata(contract_address, token_id):
    # Contract ABI
    contract_abi = get_abi(contract_address)

    # Create contract instance
    contract = web3.eth.contract(address=Web3.to_checksum_address(contract_address), abi=contract_abi)

    # Retrieve token metadata
    metadata_url = contract.functions.tokenURI(token_id).call()
    response = requests.get(metadata_url)

    if response.status_code == 200:
        metadata = response.json()
        return metadata

    return None


def get_abi(contract_address):
    # Get contract ABI from Etherscan
    etherscan_api_key = os.getenv('ETHERSCAN_API_KEY')
    etherscan_url = f'https://api.etherscan.io/api?module=contract&action=getabi&address={contract_address}&apikey={etherscan_api_key}'
    response = requests.get(etherscan_url)
    abi = response.json()['result']
    return abi


if __name__ == '__main__':
    """
    the js process will start this script with the args: job_id, contract_address, token_id
    only the last two are relevant for this script
    """
    contract_address = '0xc7df86762ba83f2a6197e1ff9bb40ae0f696b9e6'
    metadata = get_token_metadata(contract_address, 6791)
    print(metadata)

