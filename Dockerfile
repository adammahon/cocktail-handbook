##
## Global Variables
##
ARG app_root=/app
ARG app_maintainer="Adam Mahon"



##
## Build Image
##
# Set base image
FROM node:12.16.3 AS builder

# Add variable(s) used for image creation
ARG app_root
ARG app_maintainer

# Set image maintainer
LABEL maintainer=${app_maintainer}

# Create application directory
RUN mkdir ${app_root}
WORKDIR ${app_root}
ADD . ${app_root}

# Install dependencies and build application
RUN npm install
RUN npm run build



##
## Final Image
##
# Set base image
FROM node:12.16.3-alpine3.11

# Add variable(s) used for image creation
ARG app_root
ARG app_maintainer

# Set image maintainer
LABEL maintainer=${app_maintainer}

# Update the image
RUN apk update
RUN apk upgrade

# Create application directory
RUN mkdir ${app_root}
WORKDIR ${app_root}

# Copy build into new image
COPY --from=builder ${app_root}/package.json ${app_root}
COPY --from=builder ${app_root}/nuxt.config.js ${app_root}
COPY --from=builder ${app_root}/.nuxt ${app_root}/.nuxt

# Install dependencies
RUN npm install
