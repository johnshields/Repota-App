# Dockerfile for hosting Horton on AWS Elastic Beanstalk

# golang version
FROM golang:1.15.3

# base name
LABEL base.name="horton"

# set work directory
WORKDIR /usr/src/horton

# copy go modules dependency requirements file
COPY go.mod .

# copy go modules
COPY go.sum .

# download dependencies
RUN go mod download

# copy source files
COPY . .

# ports
EXPOSE 8080

# build horton
RUN go build

# run horton
CMD ["go", "run", "main.go"]