FROM node:20-alpine
COPY . /app/

WORKDIR /app
RUN npm install
RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD npm run start


# ----------------------------------------------------------------


# # use the official Bun image
# # see all versions at https://hub.docker.com/r/oven/bun/tags
# FROM oven/bun:1.1.16 AS base
# WORKDIR /usr/src/app

# # install dependencies into temp directory
# # this will cache them and speed up future builds
# FROM base AS install
# RUN mkdir -p /temp/dev
# COPY package.json bun.lockb /temp/dev/
# RUN cd /temp/dev && bun install --frozen-lockfile

# # install with --production (exclude devDependencies)
# RUN mkdir -p /temp/prod
# COPY package.json bun.lockb /temp/prod/
# RUN cd /temp/prod && bun install --frozen-lockfile --production

# # copy node_modules from temp directory
# # then copy all (non-ignored) project files into the image
# FROM base AS prerelease
# COPY --from=install /temp/dev/node_modules node_modules
# COPY . .

# # [optional] tests & build
# ENV NODE_ENV=production
# # RUN bun test
# RUN bun prisma generate
# RUN bun run build

# # copy production dependencies and source code into final image
# FROM node:20-alpine AS release
# COPY --from=install /temp/prod/node_modules node_modules
# COPY --from=prerelease /usr/src/app .

# # run the app
# USER node
# EXPOSE 3000/tcp
# ENTRYPOINT npm run start