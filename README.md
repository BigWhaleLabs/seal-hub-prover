# SealHub Prover code

This repository is to be used as proof generator for SealHub

## Deploying to cloud

[![Deploy to DO](https://www.deploytodo.com/do-btn-blue.svg)](https://cloud.digitalocean.com/apps/new?repo=https://github.com/BigWhaleLabs/seal-hub-prover/tree/main)

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/BigWhaleLabs/seal-hub-prover/tree/main)

### Google Cloud

Visit [this tutorial](./tutorials/GCPINSTALLATION.md) for Google Cloud installation

### Amazon AWS

Visit [this tutorial](./tutorials/AWSINSTALLATION.md) for Amazon AWS installation

### Any VPS server with `apt` package manager

**Make sure your machine has at least 8GB of RAM**

Follow the next steps:

1. Make port `1337` of your VM accessible from outside
2. Download deployment script from our repo:

```bash
curl -qLs -o- https://raw.githubusercontent.com/BigWhaleLabs/seal-hub-prover/run_unix.sh | sh

```

## Installation and local launch

1. Clone this repo: `git clone https://github.com/BigWhaleLabs/seal-hub-prover`
2. Launch the [mongo database](https://www.mongodb.com/) locally
3. Create `.env` with the environment variables listed below
4. Run `yarn` in the root folder
5. Run `yarn download-zk-files` for all ZK files
6. Run `yarn start`

### Using docker

1. Create `.env` with the environment variables listed below
2. Run `yarn docker-start-development` or `yarn docker-start-production`

And you should be good to go! Feel free to fork and submit pull requests.

### Environment variables

| Name     | Optional | Description                                                       |
| -------- | :------: | ----------------------------------------------------------------- |
| `MONGO`  |    ✅    | URL of the mongo database (defaults to `mongodb://mongodb:27017`) |
| `PORT`   |    ✅    | Port to run server on (defaults to `1337`)                        |
| `DOMAIN` |    ✅    | Your domain for docker                                            |

Also, please, consider looking at `.env.sample`.
