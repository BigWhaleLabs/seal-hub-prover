# Running SealHub Prover on Google Cloud Platform

1. Go to [Google Cloud Console (Compute Engine API)](https://console.cloud.google.com/compute/instances) and press the "ENABLE" button if it isn't yet enabled (it might ask you to also create and enable billing)
2. Press the "CREATE INSTANCE" button
3. Select the following options (keep others as default):
   | Option | Value |
   | --------------------------------------- | ------------- |
   | Machine Configuration -> Machine type | e2-standard-2 |
   | Firewall -> Allow HTTPS | Checked (yes) |
   
4. Go to "Boot disk" section and press "CHANGE" button
5. Select "Ubuntu" in "Operating system" dropdown menu (keep others as default)
6. Press the "SELECT" button
7. Press the "CREATE" button at the end of the page
8. Press the "SSH" button on the created instance
9. Run the following script:

```bash
curl -o- https://raw.githubusercontent.com/BigWhaleLabs/seal-hub-prover/main/scripts/install.sh | bash
```

7. Note the prover URL that will be displayed in the end, this is the URL you will use at [SealHub](https://hub.sealc.red)

> ⚠️ Don't forget to delete the instance after you generated the ZK proof so that you don't get a surprise bill from GCP.
