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
# Add Node.js APT repository
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
# Refresh package list once again after adding new repo
sudo apt-get update
# Install Docker and required packages
sudo apt-get install -y git nodejs npm docker-ce docker-ce-cli containerd.io docker-compose-plugin
# Install yarn
sudo npm i -g yarn
# Clone SealHub Prover repository
git clone https://github.com/BigWhaleLabs/seal-hub-prover.git
cd seal-hub-prover 
# Install dependencies and start SealHub Proof Generator
echo 'If you have a custom domain, enter it here; if not, just press "return" and leave it blank'
read answer
if [[ $answer =~ "^(http:\/\/localhost(:\d{1,5})?|https?:\/\/[a-z0-9-]+(\.[a-z0-9-]+)*(:\d{1,5})?)$" ]]
then
    echo "DOMAIN = $answer" > .env
    # cat <<< "DOMAIN = $answer" > .env
    yarn docker-start-production
else 
    yarn docker-start-production-no-dns
fi
