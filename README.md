# Outdated. Replaced by AIO package [eacs-server](https://github.com/chemicstry/eacs-server)

[![Build Status](https://travis-ci.org/chemicstry/eacs-message-bus.svg?branch=master)](https://travis-ci.org/chemicstry/eacs-message-bus)

# eacs-message-bus
Extensible Access Control System. MQTT Message Bus Service.

This service works as a standalone MQTT broker. Messages can be published via JSON-RPC call. Publishing is only allowed for authorized clients and only to `devices/<identifier>/` prefix. Identifier is specified in JWT used for authentication.

This is used for data logging, simple apps (remote door bell), etc. Should not be used for anything security critical as MQTT is not properly secured (yet).

## JSON-RPC API

### `publish(topic: string, message: any): void`

Publishes message on a specified topic. For example, if client identifier is `client1` and `publish('hello', 'world')` is called, message `world` will be published on `devices/client1/hello` topic.
