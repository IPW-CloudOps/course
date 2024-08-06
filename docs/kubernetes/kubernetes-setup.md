---
id: kubernetes-setup
title: Kubernetes Setup
description: Setting up a local Kubernetes environment
slug: /kubernetes/setup
sidebar_position: 2
---

# Kubernetes Setup

## Installing Minikube

   https://minikube.sigs.k8s.io/docs/start

## Installing kubectl

   https://kubernetes.io/docs/tasks/tools/

   Don't forget autocompletion!

## Setting up a Local Kubernetes Cluster

1. Start Minikube:

    ```shell
    > minikube start
    ```

2. Verify the cluster status:

    ```shell
    > minikube status
    > kubectl cluster-info
    ```

3. Enable necessary addons:

    ```shell
    > minikube addons enable ingress
    > minikube addons enable dashboard
    ```

4. Access the Kubernetes dashboard:
    
    ```shell
    > minikube dashboard
    ```

5. Deploy a sample application:

    ```shell
    > kubectl create deployment hello-minikube --image=k8s.gcr.io/echoserver:1.10
    > kubectl expose deployment hello-minikube --type=NodePort --port=8080
    ```

6. Access the deployed application:

    ```shell
    > minikube service hello-minikube
    ```

7. Clean up:

    ```shell
    > kubectl delete service hello-minikube
    > kubectl delete deployment hello-minikube
    ```

8. Stop the Minikube cluster:

    ```shell
    > minikube stop
    ```