---
id: overview-introduction
title: Introduction
description: General Overview of the Course
slug: /overview/introduction
sidebar_position: 1
---

# Introduction

## Course Overview

### Course tutors

- Cosma George (George)
- Paris Cristian-Tănase (Cristi)
- Popescu Adrian (Adi)

### Course structure

1. First day: local setup, importance of containerization and orchestration, container basics,
    containers vs virtual machines
1. Docker + docker compose
1. Kubernetes
1. Deployment + NGINX

## Importance of containerization and orchestration

### Containerization in a nutshell

### Why would someone care about containerization?

Because we care about reproducible environments. Let's say you are developing a microservice
application. So each component of your system resides in a separate, isolated environment. This
means that if, for whatever reason, a runtime error occurs in your application, then that error
is contained and the rest of the system remains unaffected.

Another important reason is we can use containers to package and deliver applications with an
environment that contains all the required dependencies for them to function properly. This
eliminates the problem of running an application on multiple systems, each of them with different
versions of dependencies. The classic *works on my system* problem.

### What does it mean to orchestrate some containers?

## Setup instruction for required tools

You need to install the following tools to solve the workshop:

1. Docker and Docker Compose (see the [manual](https://docs.docker.com/manuals/))
1. Kubectl (see the [manual](https://kubernetes.io/docs/tasks/tools/))
1. Minikube (see the [manual](https://minikube.sigs.k8s.io/docs/start/?arch=%2Flinux%2Fx86-64%2Fstable%2Fbinary+download))
1. WSL2 (if you have Windows) (follow the [install instructions](https://learn.microsoft.com/en-us/windows/wsl/install))