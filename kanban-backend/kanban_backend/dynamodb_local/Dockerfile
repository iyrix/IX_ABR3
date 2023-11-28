FROM openjdk:8-jre-alpine

WORKDIR /dynamodb-local

# Copy the DynamoDBLocal JAR file into the image
COPY DynamoDBLocal.jar .

# Expose the default port used by DynamoDBLocal
EXPOSE 8000

# Specify the entry point for running DynamoDBLocal
ENTRYPOINT ["java", "-Djava.library.path=./DynamoDBLocal_lib", "-jar", "DynamoDBLocal.jar", "-sharedDb"]
