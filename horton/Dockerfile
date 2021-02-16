FROM golang:1.15.3

# base name
LABEL base.name="horton"

# set work directory
WORKDIR /usr/src/horton

# copy go modules dependency requirements file
COPY go.mod .

# copy go modules - expected hashes file
COPY go.sum .

# download dependencies
RUN go mod download

# copy source files
COPY . .

# http port
EXPOSE 8080
EXPOSE 3306

# build horton
RUN go build

# run horton
CMD ["go", "run", "main.go"]