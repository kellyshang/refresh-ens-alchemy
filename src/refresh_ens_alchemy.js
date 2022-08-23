const { Alchemy } = require("alchemy-sdk");
const alchemy = new Alchemy();

let owner
const contractAddress = '0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85';

const getENS = async () => {
    const getENSResponse = await alchemy.nft.getNftsForOwner(owner)
    const ENSTokenInfo = getENSResponse.ownedNfts.filter(item => item.contract.address == contractAddress)
    let ENStokenIDs = []
    ENSTokenInfo.forEach(e => {
        ENStokenIDs.push(e.tokenId)
        console.log(`tokenID and ens: ${e.tokenId}, ${e.rawMetadata.name}`)
    })
    return ENStokenIDs
}

async function refresh() {
    const tokenIds = await getENS()
    console.log(`owner: ${owner}`)
    console.log(`ENStokenIDs length: ${tokenIds.length}`)
    for (let i = 0; i < tokenIds.length; i++) {
        console.log(`to refresh ens tokenID: ${tokenIds[i]}`)
        const refreshresponse = await alchemy.nft.refreshNftMetadata(contractAddress, tokenIds[i]);
        console.log(`refreshresponse: ${refreshresponse}`)
    }
    console.log("after refreshed: ")
    await getENS()
}

owner = process.argv[2].toLowerCase();
refresh()
