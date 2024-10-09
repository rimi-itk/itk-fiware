# FIWARE

Create/edit `.env.local`:

``` dotenv
# TASK_DOCKER_COMPOSE="docker compose"
```

``` shell name=start
task start
```

``` shell name=scorpio-open
open "http://$(task compose -- port scorpio 9090)/ngsi-ld/v1/types"
```

or <https://scorpio.itk-fiware.local.itkdev.dk/ngsi-ld/v1/types> if using [ITK-dev docker
setup](https://github.com/itk-dev/devops_itkdev-docker).
