1. Go to [Google Cloud console](https://console.cloud.google.com/compute/instances)
2. Click **CREATE INSTANCE**
3. Set parameters like in the table (keep others as default)

| Heading               | Parameter      | Value             |
| --------------------- | -------------- | ----------------- |
| Name                  |                | Any name you want |
| Machine Configuration | Machine Family | e2-micro          |
| Firewall              | Allow HTTPS    | Checked           |
| Firewall              | Allow HTTP     | Checked           |

4. Click **Create**
5. To expose port 1337, needed for our prover, go [here](https://console.cloud.google.com/networking/firewalls/list). Click on **Create firewall rule**. Set parameters according to the table down below:

| Parameter            | Value                        |
| -------------------- | ---------------------------- |
| Name                 | Anything sensible            |
| Direction of traffic | Ingress                      |
| Targets              | All instances in the network |
| Source IPv4 ranges   | 0.0.0.0/0                    |
| TCP                  | Checked                      |
| TCP/Ports            | 1337                         |

6. Click **Create** go back to [instances](https://console.cloud.google.com/compute/instances) and click **"SSH"** on the instance you've recently created.

7. Download deployment script from our repo:

```bash
curl -s https://raw.githubusercontent.com/BigWhaleLabs/seal-hub-prover/add-cloud-deployment/run_unix.sh --output run_unix.sh
```

8. Make script executable:

```bash
chmod +x run_unix.sh
```

9. Run the script:

```bash
./run_unix.sh
```

10. The script will load all the required files and launch the generator
