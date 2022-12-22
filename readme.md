## docker commands

### Spin rabbitmq server docker
```
docker build --rm -t rabbitmq:management-delayed_message-alpine .
```
```
docker run --name rabbitmq-local \
    -p 5672:5672 -p 15672:15672 \
    -e RABBITMQ_DEFAULT_USER=user \
    -e RABBITMQ_DEFAULT_PASS=password --rm -it \
    rabbitmq:management-delayed_message-alpine
```

### Publishing
`npm run publish 7`
### Consuming
`npm run consume`
