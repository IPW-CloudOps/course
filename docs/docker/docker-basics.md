---
id: docker-basics
title: Docker Basics
description: Essential Docker CLI commands
slug: /docker/basics
sidebar_position: 3
---

## Starting a container

:::warning

Make the distinction between a **docker image** and a **docker container**. We can see the docker
image as the template, containing a set of instructions, used for creating and running a container.
A docker container is the running instance of an image. This is similar to the distinction between
a program and a process (i.e. a process is a running instance of a program). You can read more
about this difference [here](https://aws.amazon.com/compare/the-difference-between-docker-images-and-containers/#:~:text=A%20Docker%20container%20is%20a%20self%2Dcontained%2C%20runnable%20software%20application,containers%20over%20an%20application's%20lifecycle.).

:::

In order to start a Docker container we use the following command:

```bash
cristian@cristianson:~/Desktop/ipw-docker$ docker run -it ubuntu:22.04 bash
Unable to find image 'ubuntu:22.04' locally
22.04: Pulling from library/ubuntu
3713021b0277: Already exists 
Digest: sha256:340d9b015b194dc6e2a13938944e0d016e57b9679963fdeb9ce021daac430221
Status: Downloaded newer image for ubuntu:22.04
root@78f701a0d391:/# ls
bin  boot  dev  etc  home  lib  lib32  lib64  libx32  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
root@78f701a0d391:/# 
```

:::info

If the above command requires superuser privileges, (i.e. run with **sudo**), then follow these
[steps](https://docs.docker.com/engine/install/linux-postinstall/) to avoid prefixing every command
with **sudo**.

:::

Let's break down the arguments of the `docker` command:

- `run`, starts the container
- `-i`, the container is started in **interactive** mode, which means that it can accept keyboard
input
- `-t`, associates a terminal to the run command
- `ubuntu:22.04` is the name of the **image** : **version** we want to use. Keep in mind that if we
do not explicitly specify the version, than the latest image will be pulled from
[Dockerhub](https://hub.docker.com/)
- `bash`, the command we want to run in the container

:::info

Dockerhub is a public image repository that contains prebuilt images that we can download.

:::

:::tip

If you do not know what an argument does or what is the purpose of a command, use `man docker` or
 `docker help`.

:::

We can also run non-interactive commands in containers:

```bash
cristian@cristianson:~/Desktop/ipw-docker$ docker run ubuntu:22.04 ls
bin
boot
dev
etc
home
lib
lib32
lib64
libx32
media
mnt
opt
proc
root
run
sbin
srv
sys
tmp
usr
var
```

:::note

This time, the command just shows us the output of **ls** and the container exits immediately. This
is because we have run this command in the **foreground**.

:::

:::tip

Try to also run the `sleep 5` command and see what happens!

:::

Sometimes, however, running commands in the foreground is not ideal, especially if the command
takes a long time to run/output something. During that time, our terminal input is basically
blocked and we have to open another terminal tab if we want to do something else. This is why, when
we are required to run a command or a script that takes a long time, it is better to run the
command in the background.

In order to start a container in the background, we use the `-d` option for the `docker run`
command as follows:

```bash
cristian@cristianson:~/Desktop/ipw-docker$ docker run -d ubuntu:22.04 sleep 100
8b3d484ae9ad92f669d2780faaa1b1dc850922029391bf13a12de84014610758
cristian@cristianson:~/Desktop/ipw-docker$ docker ps
CONTAINER ID   IMAGE          COMMAND       CREATED         STATUS         PORTS     NAMES
8b3d484ae9ad   ubuntu:22.04   "sleep 100"   2 seconds ago   Up 2 seconds             distracted_sammet
```

The breakdown of the columns in the `docker ps` output are:

- `CONTAINER ID` - a unique id assigned by docker to each container.
- `IMAGE` - the name of the image that served as a template for this container
- `COMMAND` - the command we have issued when starting the container
- `PORTS` - ports the container exposes for communication with the outside world
- `NAMES` - a name which is randomly assigned by Docker

:::tip

You can change the name of the container when you are starting it. Do `docker run --help`, find the
option and then restart the ubuntu container with a new name! Do `docker ps` to see if the name
changed. Also, whenever you are in doubt about what a command is supposed to do or what options it
takes, the general form is `docker <command_name> --help` to list all of the available options.

:::

Observe the fact that this time the container did not exit, and is running in the background. The
container will stop after the provided command, in our case, `sleep 100`, finishes its execution.
Running `docker ps` after 100 seconds confirms this:

```bash

cristian@cristianson:~/Desktop/ipw-docker$ docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES

```

:::tip

Run the `docker ps` command after starting a container in the foreground! You need to open another
terminal tab in order to do this.

:::

After starting a container in the background using the `-d` option, we can also connect to it
interactively with the `docker exec` command.

```bash

cristian@cristianson:~/Desktop/ipw-docker$ docker run -d ubuntu:22.04 sleep 1000
48d58d5ab0a17c69dadcf5e3c6cfd8be519845cae3c67f41da19fe5ffc1f6382
cristian@cristianson:~/Desktop/ipw-docker$ docker ps
CONTAINER ID   IMAGE          COMMAND        CREATED          STATUS          PORTS     NAMES
48d58d5ab0a1   ubuntu:22.04   "sleep 1000"   11 seconds ago   Up 10 seconds             zen_hodgkin
cristian@cristianson:~/Desktop/ipw-docker$ docker exec -it 48d58d5ab0a1 /bin/bash
root@48d58d5ab0a1:/# ls
bin  boot  dev  etc  home  lib  lib32  lib64  libx32  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
root@48d58d5ab0a1:/#

```

The format of the `docker exec` command is similar to that of `docker run`. We have used the `-it`
flags to start an interactive session with an attached terminal and we have chosen to run the
`/bin/bash` command. It is important to note that the container is uniquely identified via its
**ID** or assigned name in the **NAMES** column.

Now, we want to stop the running container because we its no fun to wait 1000 seconds to exit
automatically. In order to do this, we use the `docker stop` command with the container's **ID** or
**NAME**.

```bash

cristian@cristianson:~/Desktop/ipw-docker$ docker ps
CONTAINER ID   IMAGE          COMMAND        CREATED         STATUS         PORTS     NAMES
48d58d5ab0a1   ubuntu:22.04   "sleep 1000"   5 minutes ago   Up 5 minutes             zen_hodgkin
cristian@cristianson:~/Desktop/ipw-docker$ docker stop 48d58d5ab0a1
48d58d5ab0a1
cristian@cristianson:~/Desktop/ipw-docker$ docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
cristian@cristianson:~/Desktop/ipw-docker$ docker ps -a
CONTAINER ID   IMAGE          COMMAND        CREATED         STATUS                       PORTS     NAMES
48d58d5ab0a1   ubuntu:22.04   "sleep 1000"   5 minutes ago   Exited (137) 3 seconds ago             zen_hodgkin
8b3d484ae9ad   ubuntu:22.04   "sleep 100"    24 hours ago    Exited (0) 24 hours ago                distracted_sammet
a236cc7b0efa   ubuntu:22.04   "sleep 5"      24 hours ago    Exited (0) 24 hours ago                hardcore_ritchie
94ef886a0e61   ubuntu:22.04   "sleep 1"      24 hours ago    Exited (0) 24 hours ago                serene_keller
c7591793567d   ubuntu:22.04   "ls"           24 hours ago    Exited (0) 24 hours ago                adoring_jang
d5cd0c63b9bb   ubuntu:22.04   "ps aux"       24 hours ago    Exited (0) 24 hours ago                condescending_mcclintock
f81e1edf1b36   ubuntu:22.04   "lsdir"        24 hours ago    Created                                condescending_wu
77fa7ff22c40   ubuntu:22.04   "ls"           24 hours ago    Exited (0) 24 hours ago                pedantic_lewin
707ae3470fe6   ubuntu:22.04   "ps -ef"       24 hours ago    Exited (0) 24 hours ago                exciting_heisenberg
cf3998b22236   ubuntu:22.04   "cat"          24 hours ago    Exited (0) 24 hours ago                bold_ritchie
78f701a0d391   ubuntu:22.04   "bash"         25 hours ago    Exited (130) 24 hours ago              unruffled_feistel
081fcd62be22   ubuntu         "bash"         25 hours ago    Exited (130) 25 hours ago              interesting_swanson
f65bb2661f94   ubuntu         "bash"         25 hours ago    Exited (130) 25 hours ago              friendly_liskov
5b7f19201652   alpine         "shell"        25 hours ago    Created                                youthful_roentgen
eb2c9ced368b   alpine         "bash"         25 hours ago    Created                                magical_satoshi
5b27ae6a1c47   alpine         "bash"         25 hours ago    Created                                epic_volhard
cristian@cristianson:~/Desktop/ipw-docker$

```

We can see that the container is no longer running. Sometimes the stop command takes a while, so
do not abort it. Also, if we pass the `-a` argument to the `docker stop` command, it will also list
the containers that were stopped. We can see that the first container, **zen_hodgkin** is the one
we stopped earlier.
