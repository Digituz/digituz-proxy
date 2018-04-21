To run it in a Digituz server you will need to clone it:

```bash
git clone https://github.com/Digituz/digituz-proxy.git ~/git/digituz-proxy
cd ~/git/digituz-proxy
```

Then, you will need to run it:

```bash
DIGITUZ_NETWORK=digituz

docker build -t digituz-proxy .

docker run --name digituz-proxy \
  --network $DIGITUZ_NETWORK \
  -d digituz-proxy
```
