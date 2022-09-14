# Build Stage 1
# This build created a staging docker image
#
FROM node
WORKDIR /root/
COPY ["package.json", "package-lock.json", "./"]
RUN ["npm", "install"]
COPY ["webpack.config.ts", "./"]
COPY ["src/", "./src/"]
RUN ["npm", "run", "build"]
ENTRYPOINT ["node", "/root/node_modules/.bin/http-server" , "./dist/"]
EXPOSE 8080
# Build Stage 2
# This build takes the production build from staging build
#
FROM node:alpine
LABEL org.opencontainers.image.vendor=demo-frontend
LABEL org.opencontainers.image.title="funny Team"
WORKDIR /root/
COPY --from=builder /root/ ./
ENTRYPOINT ["node", "/root/node_modules/.bin/http-server" , "./dist/"]
EXPOSE 8080