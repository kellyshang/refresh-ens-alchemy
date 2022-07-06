const { getNftsForOwner, refreshNftMetadata, initializeAlchemy } = require("@alch/alchemy-sdk");
const alchemy = initializeAlchemy();

let owner
const contractAddress = '0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85';

const getENS = async () => {
    const getENSResponse = await getNftsForOwner(alchemy, owner)
    const ENSTokenInfo = getENSResponse.ownedNfts.filter(item => item.contract.address == contractAddress)
    let ENStokenIDs = []
    ENSTokenInfo.forEach(e => {
        ENStokenIDs.push(e.tokenId)
    })
    return ENStokenIDs
}

async function refresh() {
    const tokenIds = await getENS()
    console.log(`owner: ${owner}`)
    console.log(`ENStokenIDs length: ${tokenIds.length}`)
    for (let i = 0; i < tokenIds.length; i++) {
        console.log(`to refresh ens tokenID: ${tokenIds[i]}`)
        const refreshresponse = await refreshNftMetadata(alchemy, contractAddress, tokenIds[i]);
        console.log(`refreshresponse: ${refreshresponse}`)
    }
}

owner = process.argv[2];
refresh()