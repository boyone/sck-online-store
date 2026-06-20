FROM golang:1.25 AS builder
WORKDIR /module
COPY go.mod go.sum ./
RUN --mount=type=cache,target=/go/pkg/mod go mod download
RUN --mount=type=cache,target=/go/pkg/mod go install github.com/swaggo/swag/cmd/swag@v1.16.5
COPY . .
RUN --mount=type=cache,target=/go/pkg/mod \
    --mount=type=cache,target=/root/.cache/go-build \
    swag init -g cmd/main.go -o cmd/docs
RUN --mount=type=cache,target=/go/pkg/mod \
    --mount=type=cache,target=/root/.cache/go-build \
    CGO_ENABLED=0 GOOS=linux go build -o app ./cmd/main.go

FROM alpine:3.20.3
RUN apk --no-cache add ca-certificates && \
    apk add tzdata && \
    cp /usr/share/zoneinfo/Asia/Bangkok /etc/localtime && \
    echo "Asia/Bangkok" >  /etc/timezone && \
    apk del tzdata
WORKDIR /root/
COPY --from=builder /module/app .
ENV GIN_MODE release
EXPOSE 8000
CMD ["./app"]
