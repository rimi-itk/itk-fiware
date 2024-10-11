# FIWARE

Create/edit `.env.local`:

``` dotenv
# TASK_DOCKER_COMPOSE="docker compose --file compose.yaml --file compose.prod.override.yaml"
# TASK_BASE_URL="https://itk-fiware.some-domain"
# COMPOSE_SERVER_DOMAIN=itk-fiware.some-domain
```

> [!TIP]
> Use [Markdown code runner](https://github.com/mikkelricky/markdown-code-runner) to run the `shell` code blocks in this
> file (use `markdown-code-runner show --verbose` to show the runnable blocks).


``` shell name=start
task start
task open
```

``` shell name=scorpio-open
open "http://$(task compose -- port scorpio 9090)/ngsi-ld/v1/types"
```

or <https://scorpio.itk-fiware.local.itkdev.dk/ngsi-ld/v1/types> if using [ITK-dev docker
setup](https://github.com/itk-dev/devops_itkdev-docker).

``` mermaid
flowchart LR
    client(Client) --> pep-proxy
    pep-proxy(PEP Proxy) --> context-broker
    pep-proxy --> idm(Keyrock)
    pep-proxy --> client

    subgraph context-broker[Scorpio]
      scorpio --> scorpio-db[(database)]
    end

    subgraph idm[Idm]
      idb(Keyrock) --> idm-db[(database)]
    end
```



``` shell name=pep-proxy
# https://keyrock.docs.apiary.io/#reference/keyrock-api/authentication/create-token-with-password-method
auth_token=$(curl "http://$(task compose -- port idm 3000)/v1/auth/tokens" --header 'content-type: application/json' \
    --silent \
    --output /dev/null \
    --write-out '%header{X-Subject-Token}\n' \
    --data @- <<'JSON'
{
  "name": "pep-proxy@example.com",
  "password": "pep-proxy"
}
JSON
)
echo $auth_token

curl --silent "http://$(task compose -- port idm 3000)/v1/applications" --header "X-Auth-token: $auth_token" | jq

curl "http://$(task compose -- port pep-proxy 80)" --header 'x-Auth-token: $auth_token'
```
