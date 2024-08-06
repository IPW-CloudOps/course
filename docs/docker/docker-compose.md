---
id: docker-compose
title: Docker Compose
description: Working with Docker compose
slug: /docker/compose
sidebar_position: 3
---

## Why Docker Compose?

As we have previously seen in the [Docker Basics](./docker-basics.md) tutorial, we can create and
run containers from the CLI. But this method gets increasingly tedious as soon as we try to create
multiple containers that need to interact with one another. Would it not be nice if we also had
some kind of universal format that could allow us to specify which containers we want, how they
communicate over the network or share data?

This is where Docker Compose comes into play. It allows a user to write a specification file for
an environment. That specification file is then run by using the `docker compose` command and
Docker takes care of creating all of the required resources.
