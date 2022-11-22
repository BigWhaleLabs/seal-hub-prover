1. Go to [AWS EC2 console](https://us-east-1.console.aws.amazon.com/ec2/)
2. Click **Launch instance**, select **Launch instance** in there
3. Set following parameters like this (keep others as default):

| Heading                   | Parameter           | Value                |
| ------------------------- | ------------------- | -------------------- |
| Name                      |                     | Something sensible   |
| Instance type             |                     | `t2.large` or better |
| Application and OS images |                     | Debian               |
| Network settings          | Allow HTTPS traffic | Checked              |
| Network settings          | Allow HTTP traffic  | Checked              |

4. Create key pair by clicking **Create new keypair**, choose a sensible name and click **Create keypair**. AWS will automatically download private key file. You will need it later to connect to your EC2 instance.
5. Click **Launch instance**
6. Wait until instance loads and click **Connect to instance**
7. Click **SSH Client** and follow the connection guide in there.
8. Save the connection string and go back to _EC2_ page. Look for **Security Groups** in the sidebar and click on it.
9. Click on **Security Group ID** that corresponds to name `launch-wizard-*`. Click on the ID.
10. On the _Security Group_ page click **Edit inbound rules**, then click on **"Add rule"**.
11. Choose **Custom TCP**, type in port `1337`and choose `0.0.0.0/0` IP range. Then click **Save rules**.
12. Connect to your instance with a command saved in _Step 8_.
13. Download and launch deployment script from our repo:

```bash
curl -qLs -o- https://raw.githubusercontent.com/BigWhaleLabs/seal-hub-prover/run_unix.sh | sh

```

It will load all the required files and launch the proof generator
