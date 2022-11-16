1. Go to Google Cloud console [here](https://console.cloud.google.com/compute/instances)
2. Click **CREATE INSTANCE**
3. Set parameters like in the table (keep others as default)
   
| Heading               | Parameter      | Value             |  
|-----------------------|----------------|-------------------|
| Name                  |                | Any name you want |
| Machine Configuration | Machine Family | e2-micro          |
| Firewall              | Allow HTTPS    | Checked           |
| Firewall              | Allow HTTP     | Checked           |

4. Click **"Create"**
5. Wait until instance loads and click **"SSH"**
6. Then type in the console these commands: <br>
   ```
   $ curl -s https://raw.githubusercontent.com/BigWhaleLabs/seal-hub-prover/add-cloud-deployment/run_unix.sh 
   $ chmod +x run_unix.sh
   $ ./run_unix.sh
   ```
7. Proof generator should be running!