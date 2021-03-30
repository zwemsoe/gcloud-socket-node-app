# gcloud-socket-node-app

# Run this gcloud command:
gcloud compute firewall-rules create default-allow-websockets \
    --allow tcp:65080 \
    --target-tags websocket \
    --description "Allow websocket traffic on port 65080"
