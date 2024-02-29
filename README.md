```
bun install
bun run dev
```

```
open http://localhost:3000
```

1. Create a new service file in the /lib/systemd/system directory, for example bun-hono.service:

```
sudo vi /lib/systemd/system/erp-hono.service
```

2. Add the following content to the file, adjusting the User, WorkingDirectory, and ExecStart paths as necessary:

```
[Unit]
Description=Hono ERP Server
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/www/wwwroot/ERP/erp-backend/erp-backend/src
ExecStart=/root/.bun/bin/bun run index.ts  #can find the location of the bun binary file with the command : 'echo $BUN_INSTALL'
Restart=always

[Install]
WantedBy=multi-user.target
~                          
```

3. Save and close the file.

4. Reload the systemd daemon to apply the new service:
 
 ```
sudo systemctl daemon-reload
```

5. Enable the service to start it automatically on boot:

```
sudo systemctl enable erp-hono
```

6. Start the service:

```
sudo systemctl start erp-hono
```

voila!! now the service is started, you can check the status by typing

```
sudo systemctl status erp-hono
```