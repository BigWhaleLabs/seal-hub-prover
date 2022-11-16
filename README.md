# SealHub Prover code

This repository is to be used as proof generator for SealHub

## Installation and local launch

1. Clone this repo: `git clone https://github.com/BigWhaleLabs/seal-hub-prover`
2. Launch the [mongo database](https://www.mongodb.com/) locally
3. Create `.env` with the environment variables listed below
4. Run `yarn` in the root folder
5. Run `yarn download-zk-files` for all ZK files
6. Run `yarn start`

## Using docker

1. Create `.env` with the environment variables listed below
2. Run `yarn docker-start-development` or `yarn docker-start-production`

And you should be good to go! Feel free to fork and submit pull requests.

## Environment variables

| Name     | Description                                                               |
| -------- | ------------------------------------------------------------------------- |
| `MONGO`  | (Optional) URL of the mongo database (default to mongodb://mongodb:27017) |
| `PORT`   | (Optional) Port to run server on (defaults to 1337)                       |
| `DOMAIN` | (Optional) Your domain for docker                                         |

Also, please, consider looking at `.env.sample`.

## Deploying to cloud
### Digital Ocean
[![Deploy to DO](https://www.deploytodo.com/do-btn-blue.svg)](https://cloud.digitalocean.com/apps/new?repo=https://github.com/BigWhaleLabs/seal-hub-prover/tree/main)
### Heroku
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/BigWhaleLabs/seal-hub-prover/tree/main)
### Vercel
Unfortunately, there is no way to deploy ZK proof generator to Vercel due to lack of it's support of Docker.
### Google Cloud

### Amazon AWS
