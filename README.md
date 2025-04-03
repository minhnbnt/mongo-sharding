# Mongodb sharding với docker

## Hướng dẫn setup

Yêu cầu: `docker` (hoặc `podman`), `docker-compose`, `node`, `pnpm`.

**Bước 1**: Chạy các tiến trình với câu lệnh:

```sh
docker compose up -d
```

**Bước 2**: Cài đặt các dependencies cho config script với câu lệnh:

```sh
pnpm i --frozen-lockfile
```

**Bước 3**: Chạy script để tự động setup sharding bằng câu lệnh:

```sh
node index.js
```
