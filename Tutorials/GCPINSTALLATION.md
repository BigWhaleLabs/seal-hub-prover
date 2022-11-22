1. Go to Google Cloud console [here](https://console.cloud.google.com/compute/instances)
2. Click **CREATE INSTANCE**
3. Set following parameters like this (keep others as default):
   
| Heading               | Parameter      | Value             |  
|-----------------------|----------------|-------------------|
| Name                  |                | Any name you want |
| Machine Configuration | Machine Family | e2-micro          |
| Firewall              | Allow HTTPS    | Checked           |
| Firewall              | Allow HTTP     | Checked           |

4. Click **"Create"**
5. To expose port 1337 needed for our prover go [here](https://console.cloud.google.com/networking/firewalls/list), click on "Creater firewall rule". Set parameters according to the table down below: 
   
| Parameter            | Value                       |  
|----------------------|-----------------------------|
| Name                 | Anything sensible           |
| Direction of traffic | Ingress                     |
| Targets              | All instaces in the network |
| Source IPv4 ranges   | 0.0.0.0/0                   |
| TCP                  | Checked                     |
| TCP/Ports            | 1337                        |

1. Click "Create" go back to [instances](https://console.cloud.google.com/compute/instances) and click **"SSH"** on the instance you've recently created.
2. Follow the next steps: <br>
   - _Download deployment script from our repo:_
   > `$ curl -s https://raw.githubusercontent.com/BigWhaleLabs/seal-hub-prover/add-cloud-deployment/run_unix.sh`
   - _Make script executable:_
   > `$ chmod +x run_unix.sh` 
   - _Run the script:_
   > `$ ./run_unix.sh`

3. The script will load all the required files and launch the generator.