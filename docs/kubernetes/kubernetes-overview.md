---
id: kubernetes-overview
title: Kubernetes Overview
description: Introduction to Kubernetes
slug: /kubernetes/overview
sidebar_position: 1
---

# Kubernetes Overview

## What is Kubernetes?

Kubernetes is an open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications. Key points include:

- Developed originally by Google, now maintained by the Cloud Native Computing Foundation
- Designed to run distributed systems resiliently
- Provides features like service discovery, load balancing, storage orchestration, and self-healing
- Enables declarative configuration and automation

## Kubernetes Architecture

Kubernetes uses a master-worker architecture:

1. Master Node (Control Plane):
   - API Server: Central management point for the cluster (this is the frontend for the cluster)
   - Scheduler: Assigns work to nodes
   - Controller Manager: Regulates the state of the system
   - Cloud Controller Manager: Regulates the state of the system, in case we are using a cloud provider
   - etcd: Distributed key-value store for cluster data (mini database)

2. Worker Nodes:
   - Kubelet: Ensures containers are running in a pod
   - Container Runtime: Software for running containers (e.g., Docker)
   - Kube-proxy: Manages network rules on nodes

![cluster](/img/docs/kubernetes/1.svg)

## Other architectures

### Orchestrated architecture

![orchestrated-architecture](/img/docs/kubernetes/2.png)


## Key Kubernetes Concepts

1. Clusters:
   - A set of nodes that run containerized applications
   - Provides high availability and scalability (you can have replicas in different datacenters)

1. Nodes:
   - Physical or virtual machines in the Kubernetes cluster
   - Can be master nodes (part of the control plane) or worker nodes

1. Namespaces:
   - Virtual clusters within a physical cluster
   - Used for organizing resources and multi-tenancy

1. [Pods](./resources/pods.md):
   - Smallest deployable units in Kubernetes
   - Can contain one or more containers
   - Share network namespace and storage

    ```yaml
    apiVersion: v1
    kind: Pod
    metadata:
      name: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80
    ```


1. [Deployments](./resources/deployments.md):
   - Describe the desired state for a set of pods
   - Manage rolling updates and rollbacks

   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
      name: nginx-deployment
   labels:
      app: nginx
   spec:
      replicas: 3
      selector:
         matchLabels:
            app: nginx
   template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80
   ```

1. [Services](./resources/services.md):
   - An abstract way to expose applications running on pods
   - Provide a stable network endpoint

   ```yaml
   apiVersion: v1
   kind: Service
   metadata:
      name: my-service
   spec:
      selector:
         app.kubernetes.io/name: MyApp
      ports:
      - protocol: TCP
        port: 80
        targetPort: 9376
   ```

1. [Persistent Volumes (and Persistent Volume Claims)](./resources/persistent-volumes.md):
   - Abstraction for storage resources in the cluster

   ```yaml
   apiVersion: v1
   kind: PersistentVolumeClaim
   metadata:
      name: myclaim
   spec:
      accessModes:
         - ReadWriteOnce
      volumeMode: Filesystem
      resources:
         requests:
            storage: 8Gi
      storageClassName: slow
      selector:
         matchLabels:
            release: "stable"
         matchExpressions:
            - {key: environment, operator: In, values: [dev]}
   ```

1. [ConfigMaps and Secrets](./resources/configmaps_and_secrets.md):
   - Manage configuration data and sensitive information

   ```yaml
   apiVersion: v1
   kind: ConfigMap
   metadata:
      name: game-demo
   data:
      # property-like keys; each key maps to a simple value
      player_initial_lives: "3"
      ui_properties_file_name: "user-interface.properties"

      # file-like keys
      game.properties: |
         enemy.types=aliens,monsters
         player.maximum-lives=5    
      user-interface.properties: |
         color.good=purple
         color.bad=yellow
         allow.textmode=true
   ```

   ```yaml
   apiVersion: v1
   kind: Secret
   metadata:
      name: dotfile-secret
   data:
      .secret-file: dmFsdWUtMg0KDQo=
   ---
   apiVersion: v1
   kind: Pod
   metadata:
      name: secret-dotfiles-pod
   spec:
      volumes:
      - name: secret-volume
        secret:
         secretName: dotfile-secret
        containers:
      - name: dotfile-test-container
        image: registry.k8s.io/busybox
        command:
         - ls
         - "-l"
         - "/etc/secret-volume"
        volumeMounts:
         - name: secret-volume
           readOnly: true
           mountPath: "/etc/secret-volume"
   ```

1. [Ingress](./resources/ingress.md):
   - Manage external access to services in a cluster

   ```yaml
   apiVersion: networking.k8s.io/v1
   kind: Ingress
   metadata:
      name: minimal-ingress
      annotations:
         nginx.ingress.kubernetes.io/rewrite-target: /
   spec:
      ingressClassName: nginx-example
      rules:
      - http:
         paths:
         - path: /testpath
           pathType: Prefix
           backend:
            service:
               name: test
               port:
                  number: 80
   ```