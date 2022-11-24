# Refresh package list
sudo apt-get update
# Remove old Docker installations
sudo apt-get remove -y docker docker-engine docker.io containerd runc
# Install packages required for Docker
sudo apt-get install -y ca-certificates curl gnupg lsb-release
# Add Docker official GPG key
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
# Add Docker repository to dpkg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
# Refresh package list once again after adding new repo
sudo apt-get update
# Install Docker and required packages
sudo apt-get install -y git docker-ce docker-ce-cli containerd.io docker-compose-plugin
# Clone SealHub Prover repository
git clone https://github.com/BigWhaleLabs/seal-hub-prover.git
cd seal-hub-prover 
# Ask if user has a custom domain, if he doesn't launch the prover without DNS, if he does take the name from the user and put it to the .env
echo 'If you have a custom domain, enter it here; if not, just press "return" and leave it blank'
# Reads the answer from the user and compares it with the regex string
read answer
answer_regex="^(localhost|[a-z0-9-]+(\.[a-z0-9-]+))$"
if [[ $answer =~ $answer_regex ]]
# Flushes .env in case there's any old domains in the file
> .env
then
    # Puts the domain name in the .env and starts production profile of Docker
    echo "DOMAIN=$answer" >> .env
    sudo docker compose --profile=production up && sudo docker logs obss-proxy-lt
else 
    # Starts production profile of Docker without custom domain
    sudo docker compose --profile=production-no-dns up -d && sudo docker logs obss-proxy-lt
fi
