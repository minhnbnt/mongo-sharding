# Mongodb sharding với docker

## Hướng dẫn setup

Yêu cầu: `ansible`, `docker` (hoặc `podman`), `docker-compose`.

**Bước 1**: Chạy các containers với câu lệnh:

```sh
docker compose up -d
```

**Bước 2** Thực hiện cấu hình sharding với câu lệnh:

```sh
ansible-playbook playbooks/init-shards.yml
```
