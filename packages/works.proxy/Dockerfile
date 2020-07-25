# The certs need to properly be set up as secrets in kubernetes, but for debugging, we can copy the self signed certs for now.  The kubernetes
# release will need to volumeize the certs as decrypting these can be done by anybody since the key is simply not private.  The real key will
# be hosted somewhere else.  This is useful for debugging.
FROM nginx:1.17.3-alpine
COPY prod/default.conf /etc/nginx/conf.d/default.conf
COPY certs/ etc/nginx/certs/
