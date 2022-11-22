1. Go to **AWS EC2** console [here](https://us-east-1.console.aws.amazon.com/ec2/)
2. Click **"Launch instance**, select **"Launch instance"** in there
3. Set following parameters like this (keep others as default): 
   
| Heading                      | Parameter              | Value               |  
|------------------------------|------------------------|---------------------|
| Name                         |                        | Something sensible  |
| Instance type                |                        | `t2.large` or better|
| Application and OS images    |                        | Debian              |
| Network settings             | Allow HTTPS traffic    | Checked             |
| Network settings             | Allow HTTP traffic     | Checked             |

4. Create key pair by clicking **"Create new keypair"**, choose a sensible name and click **"Create keypair"**. Save those keys for later. You will need them to connect to your EC2 instance.

5. Click **"Launch instance"** 
6. Wait until instance loads and click **"Connect to instance"**
7. Click **"SSH Client"** and follow the guide in there.
8. After establishing connection to your instance, follow the next steps: <br>
   - _Download deployment script from our repo:_
   > `$ curl -s https://raw.githubusercontent.com/BigWhaleLabs/seal-hub-prover/add-cloud-deployment/run_unix.sh`
   - _Make script executable:_
   > `$ chmod +x run_unix.sh` 
   - _Run the script:_
   > `$ ./run_unix.sh`

9.  The script will load all the required files and launch the generator