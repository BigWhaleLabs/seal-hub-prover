# Refresh package list
sudo apt-get update

# Remove old docker installations 
sudo apt-get remove -y docker docker-engine docker.io containerd runc
# Install packages required for Docked
sudo apt-get install -y ca-certificates curl gnupg lsb-release
# Add docked official GPG key
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
# Add Docker repository to dpkg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
# Refresh package list once again after adding new repo
sudo apt-get update 

# Install Docker and required packages
sudo apt-get install -y git nodejs npm docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Install yarn
sudo npm install --global yarn

# Clone SealHub Proof Generator repository
git clone https://github.com/BigWhaleLabs/seal-hub-prover.git
cd seal-hub-prover 

# Run yarn and start SealHub Proof Generator
yarn install
sudo docker compose --profile=production up
