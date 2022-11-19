const fs = require("fs")
const os = require("os")
const hre = require("hardhat")

require("dotenv").config({ path: "../../.env" })

function setEnvValue(key, value) {
  // read file from hdd & split if from a linebreak to a array
  const ENV_VARS = fs.readFileSync(".env", "utf8").split(os.EOL)
  // find the env we want based on the key
  const target = ENV_VARS.indexOf(
    ENV_VARS.find((line) => {
      return line.match(new RegExp(key))
    }),
  )
  // replace the key/value with the new value
  ENV_VARS.splice(target, 1, `${key}=${value}`)
  // write everything back to the file system
  fs.writeFileSync("./.env", ENV_VARS.join(os.EOL))
}

async function main() {
  console.log("Deploying Frozr contract...")
  const FrozrContract = await hre.ethers.getContractFactory("Frozr")
  console.log("Contract instance created...")
  const frozr = await FrozrContract.deploy()
  console.log("Deploying contract...")
  await frozr.deployed()

  const network = hre.network.name.toUpperCase()
  console.log(
    `Frozer contract deployed to: ${frozr.address} on the ${network} network`,
  )
  setEnvValue(`VITE_${network}_CONTRACT_ADDRESS`, frozr.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
