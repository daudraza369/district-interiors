# Coolify Terminal Debug Commands

Run these commands in Coolify's Terminal to diagnose CMS container issues:

## 1. Check Container Status
```bash
docker ps -a | grep cms
```

## 2. View CMS Container Logs (Most Important!)
```bash
docker logs cms-jggwgwcw4w4gkkkwocokcog8-101101920253 --tail 100
```
Or get the latest container name:
```bash
docker logs $(docker ps -a | grep cms | head -1 | awk '{print $1}') --tail 100
```

## 3. Check if Strapi Port is Listening
```bash
docker exec $(docker ps -a | grep cms | head -1 | awk '{print $1}') nc -z localhost 1337 && echo "Port 1337 is open" || echo "Port 1337 is closed"
```

## 4. Check Environment Variables in CMS Container
```bash
docker exec $(docker ps -a | grep cms | head -1 | awk '{print $1}') env | grep -E "DATABASE|APP_KEYS|JWT|STRAPI"
```

## 5. Test Database Connection from CMS Container
```bash
docker exec $(docker ps -a | grep cms | head -1 | awk '{print $1}') sh -c "nc -z postgres 5432 && echo 'Database reachable' || echo 'Database NOT reachable'"
```

## 6. Check Container Health Status
```bash
docker inspect $(docker ps -a | grep cms | head -1 | awk '{print $1}') | grep -A 10 Health
```

## 7. Enter CMS Container Shell (Interactive Debugging)
```bash
docker exec -it $(docker ps -a | grep cms | head -1 | awk '{print $1}') sh
```
Then inside the container:
```bash
# Check if Strapi process is running
ps aux | grep node

# Check if port 1337 is listening
netstat -tlnp | grep 1337

# Try to start Strapi manually to see errors
cd /app && npm start
```

## 8. Check All Running Containers
```bash
docker ps -a
```

## 9. Check Docker Compose Services
```bash
docker compose ps
```

## 10. View Recent Logs with Timestamps
```bash
docker logs $(docker ps -a | grep cms | head -1 | awk '{print $1}') --tail 200 --timestamps
```

## Quick One-Liner to Get CMS Container Name
```bash
CMS_CONTAINER=$(docker ps -a | grep cms | head -1 | awk '{print $1}') && echo "CMS Container: $CMS_CONTAINER" && docker logs $CMS_CONTAINER --tail 50
```

